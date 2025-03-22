class FileUploader {
    private dropArea: HTMLElement;
    private fileInput: HTMLInputElement;
    private fileList: HTMLElement;

    constructor() {
        this.dropArea = document.getElementById('drop-area')!;
        this.fileInput = document.getElementById('file-input')! as HTMLInputElement;
        this.fileList = document.getElementById('file-list')!;
        this.setupEventListeners();
        this.fetchFiles();
    }

    private setupEventListeners(): void {
        this.dropArea.addEventListener('dragover', this.handleDragOver.bind(this));
        this.dropArea.addEventListener('drop', this.handleDrop.bind(this));
        this.dropArea.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', this.handleFileInputChange.bind(this));
    }

    private handleDragOver(event: DragEvent): void {
        event.preventDefault();
        this.dropArea.classList.add('drag-over');
    }

    private handleDrop(event: DragEvent): void {
        event.preventDefault();
        this.dropArea.classList.remove('drag-over');
        const files = event.dataTransfer?.files;
        if (files) {
            this.handleFiles(files);
        }
    }

    private handleFileInputChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        const files = target.files;
        if (files) {
            this.handleFiles(files);
        }
    }

    private handleFiles(files: FileList): void {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            this.uploadFile(file);
        }
    }

    private async uploadFile(file: File): Promise<void> {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                // throw an error if the response is not OK
                throw new Error(`Upload failed with status: ${response.status}`);
            }

            const filename = file.name;
            this.displayUploadedFile(filename);
        } catch (error) {
            console.error('Upload error:', error);
            this.displayError('File upload failed. Please try again.');
        }
    }

    private async fetchFiles(): Promise<void> {
        try {
            const response = await fetch('/files');
            if (!response.ok) {
                // throw an error if the response is not OK
                throw new Error(`Failed to fetch files: ${response.status}`);
            }
            const files: string[] = await response.json();
            this.fileList.innerHTML = '';
            files.forEach((file) => this.displayUploadedFile(file));
        } catch (error) {
            // display error on screen 
            console.error('Error fetching files:', error);
            this.displayError('Failed to load file list.');
        }
    }

    private displayUploadedFile(fileName: string): void {
        const fileDiv = document.createElement('div');
        const fileLink = document.createElement('a');
        fileLink.href = `/uploads/${fileName}`;
        fileLink.textContent = `Download: ${fileName}`;
        fileDiv.appendChild(fileLink);
        this.fileList.appendChild(fileDiv);
    }

    private displayError(errorMessage: string): void {
        const errorDiv = document.createElement('div');
        errorDiv.style.color = 'red';
        errorDiv.textContent = errorMessage;
        this.fileList.appendChild(errorDiv);
    }
}

new FileUploader();