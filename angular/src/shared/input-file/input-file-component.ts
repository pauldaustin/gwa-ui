import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';

@Component({
  'moduleId': module.id,
  'selector': 'app-input-file',
  'templateUrl': './input-file-component.html'
})
export class InputFileComponent {
  @Input() accept: string;

  @Input() iconName = 'floppy-o';

  @Input() label = 'Choose File';

  @Output() onFileSelect: EventEmitter<File> = new EventEmitter();

  @ViewChild('inputFile') nativeInputFile: ElementRef;

  private file: File;

  fileName: string;

  onNativeInputFileSelect(event) {
    const files = event.srcElement.files;
    if (files.length === 0) {
      this.file = null;
      this.fileName = null;
    } else {
      this.file = files[0];
      this.fileName = this.file.name;
    }
    this.onFileSelect.emit(this.file);
  }

  selectFile() {
    this.nativeInputFile.nativeElement.click();
  }

}
