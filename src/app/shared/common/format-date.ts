import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class FormatDate {
  public dateToNgbDateStruct(date: Date): NgbDateStruct {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  public dateToDateString(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  public dateToMonthYearString(date: Date): string {
    return `${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  public ngbDateStructToDate(ngbDate: NgbDateStruct): Date {
    return new Date(`${ngbDate.year}-${ngbDate.month}-${ngbDate.day + 1}`);
  }

  public ngbDateStructToDateString(ngbDate: NgbDateStruct): string {
    return `${ngbDate.year}-${ngbDate.month}-${ngbDate.day}`;
  }
}
