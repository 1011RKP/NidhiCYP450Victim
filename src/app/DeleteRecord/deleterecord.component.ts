import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-deleterecord',
    templateUrl: './deleterecord.component.html',
    styleUrls: ['./deleterecord.component.css']
})

export class DeleterecordComponent implements OnInit {
    @Input()
    data: any;

    d: any;
    deleteresponse: string;

    @Output()
    OnDeleteClickEvent: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private _appService: AppService) { }

    ngOnInit() {
    }

    deleteRecord(): void {
        if (this.data) {
            this.d = this.data[0];
            console.log(this.d);
            this._appService.getService().subscribe(
                (res) => {
                    if (res !== null) {
                        const url = '/_api/web/lists/getbytitle(\'CYP450 Victim\')/items(' + this.d.Id + ')';
                        this._appService.deleteDatafromList(url, res.d.GetContextWebInformation.FormDigestValue)
                            .subscribe(
                                (dataresponse) => {
                                    this.deleteresponse = 'deleted';
                                    this.OnDeleteClickEvent.emit(this.deleteresponse);
                                },
                                (error) => {
                                    this.deleteresponse = 'notdeleted';
                                });
                    } else {
                        this.deleteresponse = 'notdeleted';
                    }
                },
                (error) => {
                    this.deleteresponse = 'notdeleted';
                });
        }

    }
}

