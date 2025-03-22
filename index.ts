// index.ts

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

            if (response.ok) {
                // if server returns the filename in the response
                const filename = file.name; 
                this.displayUploadedFile(filename);
            } else {
                console.error('Upload failed:', response.statusText);
            }
        } catch (error) {
            console.error('Upload error:', error);
        }
    }

    private async fetchFiles(): Promise<void> {
        try {
            const response = await fetch('/files');
            if (response.ok) {
                const files: string[] = await response.json();
                // console.log('Fetched files:', files); 
                // clear the file list before adding new links
                this.fileList.innerHTML = '';

                files.forEach((file) => this.displayUploadedFile(file));
            } else {
                console.error('Failed to fetch files:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching files:', error);
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
}

new FileUploader();