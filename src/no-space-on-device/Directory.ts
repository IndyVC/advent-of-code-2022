import File from "./File";

class Directory {
  files: File[];
  directories: Directory[];
  parent: Directory;

  constructor(public name: string) {
    this.files = [];
    this.directories = [];
  }

  addDirectory(directory: Directory) {
    directory.parent = this;
    this.directories = [...this.directories, directory];
  }

  addFile(file: File) {
    this.files = [...this.files, file];
  }

  size(): number {
    const fileSizes = this.files.reduce(
      (total, file) => (total += file.size),
      0
    );
    const directorySizes = this.directories.reduce(
      (total, directory) => (total += directory.size()),
      0
    );

    return fileSizes + directorySizes;
  }

  flatten(): Directory[] {
    return [this, ...this.directories.map((d) => d.flatten()).flat(1)];
  }
}

export default Directory;
