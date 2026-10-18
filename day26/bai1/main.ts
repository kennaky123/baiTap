// ==========================================
// Bài 1 — TypeScript OOP: Quản lý thư viện
// ==========================================

// 1. Class cha: LibraryItem
class LibraryItem {
  public title: string;
  public year: number;
  private isBorrowed: boolean;

  constructor(title: string, year: number) {
    this.title = title;
    this.year = year;
    this.isBorrowed = false; // Mặc định false
  }

  // Mượn món đồ: nếu chưa ai mượn thì mượn và trả về true, ngược lại trả về false
  public borrow(): boolean {
    if (!this.isBorrowed) {
      this.isBorrowed = true;
      return true;
    }
    return false;
  }

  // Trả lại món đồ
  public returnItem(): void {
    this.isBorrowed = false;
  }

  // Trạng thái hiện tại
  public getStatus(): string {
    return this.isBorrowed ? "Đang được mượn" : "Còn trong kho";
  }

  // Thông tin cơ bản
  public getInfo(): string {
    return `${this.title} (${this.year})`;
  }
}

// 2. Class con Book kế thừa LibraryItem
class Book extends LibraryItem {
  public author: string;

  constructor(title: string, year: number, author: string) {
    super(title, year);
    this.author = author;
  }

  // Override getInfo() gọi lại super.getInfo()
  public override getInfo(): string {
    return `[Book] ${super.getInfo()} - ${this.author}`;
  }
}

// 3. Class con Magazine kế thừa LibraryItem
class Magazine extends LibraryItem {
  public issueNumber: number;

  constructor(title: string, year: number, issueNumber: number) {
    super(title, year);
    this.issueNumber = issueNumber;
  }

  // Override getInfo() gọi lại super.getInfo()
  public override getInfo(): string {
    return `[Magazine] ${super.getInfo()} - Số ${this.issueNumber}`;
  }
}

// 4. Class Library quản lý danh sách món đồ
class Library {
  private items: LibraryItem[] = [];

  // Thêm một item vào thư viện
  public addItem(item: LibraryItem): void {
    this.items.push(item);
  }

  // Mượn item theo tên (title)
  public borrowItem(title: string): void {
    const item: LibraryItem | undefined = this.items.find(
      (i: LibraryItem): boolean => i.title.toLowerCase() === title.toLowerCase()
    );

    if (!item) {
      console.log(`Không tìm thấy món đồ: ${title}`);
      return;
    }

    if (item.borrow()) {
      console.log(`Mượn thành công: ${item.title}`);
    } else {
      console.log(`Không mượn được: ${item.title} đang có người mượn`);
    }
  }

  // In danh sách tất cả món kèm trạng thái
  public printAll(): void {
    this.items.forEach((item: LibraryItem): void => {
      console.log(`${item.getInfo()} - ${item.getStatus()}`);
    });
  }
}

// 5. Kiểm thử chương trình
const library: Library = new Library();

const book1: Book = new Book("Clean Code", 2008, "Robert C. Martin");
const book2: Book = new Book("Đắc Nhân Tâm", 1936, "Dale Carnegie");
const mag1: Magazine = new Magazine("Tech Today", 2024, 12);

library.addItem(book1);
library.addItem(book2);
library.addItem(mag1);

// Mượn 1 cuốn
library.borrowItem("Clean Code");

// Thử mượn lại chính cuốn đó
library.borrowItem("Clean Code");

// In danh sách tất cả các món kèm trạng thái
library.printAll();
