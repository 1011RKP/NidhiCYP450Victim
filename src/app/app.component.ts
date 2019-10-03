import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { Compound, Program } from './data';
import { ToastrService } from 'ngx-toastr';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedData: Compound;
  seletedItem: any;
  CYP450VictimData: any[];
  Program: string;
  Compound: string;
  CYP450ID: number;
  createNew: boolean;

  message: string; error: string;
  URL: string;

  Substrate1A2: string; TNR1A2: string; Comment1A2: string;
  Substrate2B6: string; TNR2B6: string; Comment2B6: string;
  Substrate2C8: string; TNR2C8: string; Comment2C8: string;
  Substrate2C9: string; TNR2C9: string; Comment2C9: string;
  Substrate2C19: string; TNR2C19: string; Comment2C19: string;
  Substrate2D6: string; TNR2D6: string; Comment2D6: string;
  Substrate3A4: string; TNR3A4: string; Comment3A4: string;
  Substrate3A5: string; TNR3A5: string; Comment3A5: string;
  ParentRemain95: string;
  ParentRemain85: string;
  ParentRemain8520: string;
  ParentRemain20: string;

  Nodata: boolean = true;
  isAdminTrue: boolean = false;
  //deleteID: string;

  constructor(
    public toastr: ToastrService,
    vcr: ViewContainerRef,
    private _appService: AppService) { }

  ngOnInit() {
    this.getCY450VictimAdmin();
  }

  OnChange(response): void {
    this.getADMEData(this.Program, this.Compound);
  }

  OnSelectionChange(selectedData: Compound): void {
    this.selectedData = selectedData;
    if (selectedData != null && selectedData !== <any>'-- Select Compound --') {
      this.Compound = this.selectedData.Id;
      this.Program = this.selectedData.Program.Id;
      this.getADMEData(this.Program, this.Compound);
    } else {
      this.Compound = null;
      this.Program = null;
    }
  }

  OnDeleteChange(response): void {
    response = (response === 'deleted') ? this.ConformMessage() : this.ErrorMessage();
  }

  setseletedItem(data: any): void {
    this.seletedItem = data;
  }

  getADMEData(program: string, compound: string): void {
    const select = '?$select=Id,Substrate_x0020_1A2,TNR_x0020_1A2,Comment_x0020_1A2,Substrate_x0020_2B6,TNR_x0020_2B6,' +
      'Comment_x0020_2B6,Substrate_x0020_2C8,TNR_x0020_2C8,Comment_x0020_2C8,Substrate_x0020_2C9,' +
      'TNR_x0020_2C9,Comment_x0020_2C9,Substrate_x0020_2C19,TNR_x0020_2C19,Comment_x0020_2C19,' +
      'Substrate_x0020_2D6,TNR_x0020_2D6,Comment_x0020_2D6,Substrate_x0020_3A4,TNR_x0020_3A4,' +
      'ParentRemain95,ParentRemain_x0020_85,ParentRemain_x0020_8520,ParentRemain_x0020_20,' +
      'Comment_x0020_3A4,Substrate_x0020_3A5,TNR_x0020_3A5,Comment_x0020_3A5,URL,' +
      'Created,Program/Id,Compound/Id';
    const expand = '&$expand=Program/Id,Compound/Id';
    const filter = '&$filter=(Program/Id eq ' + program + ') and (Compound/Id eq ' + compound + ')';
    const order = '&$orderby=Created desc';
    const url = '/_api/web/lists/getbytitle(\'CYP450%20Victim\')/items' + select + expand + filter + order;
    // console.log(url);
    this._appService.getListItem(url)
      .subscribe(
        (res) => {
          if (res.d.results.length == 0) {
            this.Nodata = true;
            this.createNew = true;
            this.setBlankForm(this.Program, this.Compound);
          } else {
            this.createNew = false;
            this.Nodata = false;
            //this.deleteID = 
            this.CYP450VictimData = res.d.results;
            this.setVictimData(this.CYP450VictimData);
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
        });
  }

  setVictimData(CYP450VictimData: any): void {
    this.Substrate1A2 = this.setDropdown(CYP450VictimData[0].Substrate_x0020_1A2);
    this.TNR1A2 = CYP450VictimData[0].TNR_x0020_1A2; this.Comment1A2 = CYP450VictimData[0].Comment_x0020_1A2;
    this.Substrate2B6 = this.setDropdown(CYP450VictimData[0].Substrate_x0020_2B6);
    this.TNR2B6 = CYP450VictimData[0].TNR_x0020_2B6; this.Comment2B6 = CYP450VictimData[0].Comment_x0020_2B6;
    this.Substrate2C8 = this.setDropdown(CYP450VictimData[0].Substrate_x0020_2C8);
    this.TNR2C8 = CYP450VictimData[0].TNR_x0020_2C8; this.Comment2C8 = CYP450VictimData[0].Comment_x0020_2C8;
    this.Substrate2C9 = this.setDropdown(CYP450VictimData[0].Substrate_x0020_2C9);
    this.TNR2C9 = CYP450VictimData[0].TNR_x0020_2C9; this.Comment2C9 = CYP450VictimData[0].Comment_x0020_2C9;
    this.Substrate2C19 = this.setDropdown(CYP450VictimData[0].Substrate_x0020_2C19);
    this.TNR2C19 = CYP450VictimData[0].TNR_x0020_2C19; this.Comment2C19 = CYP450VictimData[0].Comment_x0020_2C19;
    this.Substrate2D6 = this.setDropdown(CYP450VictimData[0].Substrate_x0020_2D6);
    this.TNR2D6 = CYP450VictimData[0].TNR_x0020_2D6; this.Comment2D6 = CYP450VictimData[0].Comment_x0020_2D6;
    this.Substrate3A4 = this.setDropdown(CYP450VictimData[0].Substrate_x0020_3A4);
    this.TNR3A4 = CYP450VictimData[0].TNR_x0020_3A4; this.Comment3A4 = CYP450VictimData[0].Comment_x0020_3A4;
    this.Substrate3A5 = this.setDropdown(CYP450VictimData[0].Substrate_x0020_3A5);
    this.TNR3A5 = CYP450VictimData[0].TNR_x0020_3A5; this.Comment3A5 = CYP450VictimData[0].Comment_x0020_3A5;
    this.ParentRemain95 = this.setDropdown(CYP450VictimData[0].ParentRemain95);
    this.ParentRemain85 = this.setDropdown(CYP450VictimData[0].ParentRemain_x0020_85);
    this.ParentRemain8520 = this.setDropdown(CYP450VictimData[0].ParentRemain_x0020_8520);
    this.ParentRemain20 = this.setDropdown(CYP450VictimData[0].ParentRemain_x0020_20);
    this.CYP450ID = CYP450VictimData[0].ID;
    this.URL = (CYP450VictimData[0].URL !== null) ? CYP450VictimData[0].URL.Url : "";
  }

  setBlankForm(program: string, compound: string): void {
    this.Substrate1A2 = "Most likely no";
    this.TNR1A2 = '';
    this.Comment1A2 = '';
    this.Substrate2B6 = 'Most likely no';
    this.TNR2B6 = ''; this.Comment2B6 = '';
    this.Substrate2C8 = 'Most likely no';
    this.TNR2C8 = ''; this.Comment2C8 = '';
    this.Substrate2C9 = 'Most likely no';
    this.TNR2C9 = ''; this.Comment2C9 = '';
    this.Substrate2C19 = 'Most likely no';
    this.TNR2C19 = ''; this.Comment2C19 = '';
    this.Substrate2D6 = 'Most likely no';
    this.TNR2D6 = ''; this.Comment2D6 = '';
    this.Substrate3A4 = 'Most likely no';
    this.TNR3A4 = ''; this.Comment3A4 = '';
    this.Substrate3A5 = 'Most likely no';
    this.TNR3A5 = ''; this.Comment3A5 = '';
    this.ParentRemain95 = ">95% Parent remaining";
    this.ParentRemain85 = "85-95% Parent remaining";
    this.ParentRemain8520 = "85-20% Parent remaining";
    this.ParentRemain20 = "<20% Parent remaining";
    this.URL = '';
  }

  setDropdown(data: string): string {
    if (data !== null) {
      return data;
    } else {
      return '';
    }
  }

  saveClick(): void {
    if (this.createNew === true) {
      this.saveChanges();
    } else {
      this.editRecord();
    }
  }

  saveChanges(): void {
    if (this.Compound !== '' && this.Program !== '') {
      this._appService.getService().subscribe(
        (res) => {
          if (res.length !== 0) {
            const url = '/_api/web/lists/getbytitle(\'CYP450 Victim\')/items';
            this._appService.addDatatoList(url, {
              ProgramId: this.Program,
              CompoundId: this.Compound,
              Substrate_x0020_1A2: this.Substrate1A2,
              TNR_x0020_1A2: this.TNR1A2,
              Comment_x0020_1A2: this.Comment1A2,
              Substrate_x0020_2B6: this.Substrate2B6,
              TNR_x0020_2B6: this.TNR2B6,
              Comment_x0020_2B6: this.Comment2B6,
              Substrate_x0020_2C8: this.Substrate2C8,
              TNR_x0020_2C8: this.TNR2C8,
              Comment_x0020_2C8: this.Comment2C8,
              Substrate_x0020_2C9: this.Substrate2C9,
              TNR_x0020_2C9: this.TNR2C9,
              Comment_x0020_2C9: this.Comment2C9,
              Substrate_x0020_2C19: this.Substrate2C19,
              TNR_x0020_2C19: this.TNR2C19,
              Comment_x0020_2C19: this.Comment2C19,
              Substrate_x0020_2D6: this.Substrate2D6,
              TNR_x0020_2D6: this.TNR2D6,
              Comment_x0020_2D6: this.Comment2D6,
              Substrate_x0020_3A4: this.Substrate3A4,
              TNR_x0020_3A4: this.TNR3A4,
              Comment_x0020_3A4: this.Comment3A4,
              Substrate_x0020_3A5: this.Substrate3A5,
              TNR_x0020_3A5: this.TNR3A5,
              Comment_x0020_3A5: this.Comment3A5,
              ParentRemain95: this.ParentRemain95,
              ParentRemain_x0020_85: this.ParentRemain85,
              ParentRemain_x0020_8520: this.ParentRemain8520,
              ParentRemain_x0020_20: this.ParentRemain20,
              URL:
              {
                'Description': "Click Here",
                'Url': this.URL
              }
            }, res.d.GetContextWebInformation.FormDigestValue)
              .subscribe(
                (dataresponse) => {
                  if (dataresponse.length === 0) {
                    this.toastr.error('Problem creating record. Please contact IT.');
                    this.message = '';
                  } else {
                    this.Nodata = false;
                    this.toastr.success('Added new CYP450-Victim data');
                    this.getADMEData(this.Program, this.Compound);
                    this.createNew = false;
                  }
                },
                (error) => {
                  this.toastr.error('Problem creating record. Please contact IT.');
                });
          } else {
            this.toastr.error('Problem creating record. Please contact IT.');
          }
        },
        (error) => {
          this.toastr.error('Problem creating record. Please contact IT.');
        });
    }
  }

  editRecord(): void {
    if (this.Compound !== '' && this.Program !== '') {
      this._appService.getService().subscribe(
        (res) => {
          if (res.length !== 0) {
            const url = '/_api/web/lists/getbytitle(\'CYP450 Victim\')/items(' + this.CYP450ID + ')';
            this._appService.editDatatoList(url, {
              Substrate_x0020_1A2: this.Substrate1A2,
              TNR_x0020_1A2: this.TNR1A2,
              Comment_x0020_1A2: this.Comment1A2,
              Substrate_x0020_2B6: this.Substrate2B6,
              TNR_x0020_2B6: this.TNR2B6,
              Comment_x0020_2B6: this.Comment2B6,
              Substrate_x0020_2C8: this.Substrate2C8,
              TNR_x0020_2C8: this.TNR2C8,
              Comment_x0020_2C8: this.Comment2C8,
              Substrate_x0020_2C9: this.Substrate2C9,
              TNR_x0020_2C9: this.TNR2C9,
              Comment_x0020_2C9: this.Comment2C9,
              Substrate_x0020_2C19: this.Substrate2C19,
              TNR_x0020_2C19: this.TNR2C19,
              Comment_x0020_2C19: this.Comment2C19,
              Substrate_x0020_2D6: this.Substrate2D6,
              TNR_x0020_2D6: this.TNR2D6,
              Comment_x0020_2D6: this.Comment2D6,
              Substrate_x0020_3A4: this.Substrate3A4,
              TNR_x0020_3A4: this.TNR3A4,
              Comment_x0020_3A4: this.Comment3A4,
              Substrate_x0020_3A5: this.Substrate3A5,
              TNR_x0020_3A5: this.TNR3A5,
              Comment_x0020_3A5: this.Comment3A5,
              ParentRemain95: this.ParentRemain95,
              ParentRemain_x0020_85: this.ParentRemain85,
              ParentRemain_x0020_8520: this.ParentRemain8520,
              ParentRemain_x0020_20: this.ParentRemain20,
              URL:
              {
                'Description': "Click Here",
                'Url': this.URL
              },
            }, res.d.GetContextWebInformation.FormDigestValue)
              .subscribe(
                (dataresponse) => {
                  this.Nodata = false;
                  this.toastr.success('Record Updated Successfully');
                },
                (error) => {
                  this.toastr.error('Problem creating record. Please contact IT.');

                });
          } else {
            this.toastr.error('Problem creating record. Please contact IT.');
          }
        },
        (error) => {
          this.toastr.error('Problem creating record. Please contact IT.');
        });
    }
  }

  getCY450VictimAdmin(): void {
    const url = "/_api/web/currentUser/groups?$select=title,Id&$filter=title+eq+'CYP450 Victim'";
    this._appService.getListItem(url)
      .subscribe(
        (res) => {
          console.log(res);
          if (res) {
            let userLength = res.d.results.length;
            this.isAdminTrue = (userLength !== 0) ? true : false;
          }
        },
        (error) => {
          this.error = 'Problem accessing the Service';
        });
  }

  //*! Helper Classes
  ConformMessage(): void {
    this.Nodata = true;
    this.toastr.error('Record Deleted Successfully');
    this.getADMEData(this.Program, this.Compound);
  }
  ErrorMessage(): void {
    this.toastr.error('Something Went Wrong please contact IT');
  }
}
