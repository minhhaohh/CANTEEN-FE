import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class FormatDate {
  public dateToNgbDateStruct(date: Date): NgbDateStruct {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  public ngbDateStructToDate(ngbDate: NgbDateStruct): Date {
    return new Date(`${ngbDate.year}-${ngbDate.month}-${ngbDate.day + 1}`);
  }
}
