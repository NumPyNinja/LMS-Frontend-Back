import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Program } from '../program';
import { ProgramService } from '../program.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 250px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
})
export class ProgramComponent implements OnInit {

  programDialogue: boolean;

  programs: Program[];

  program: Program;

  selectedPrograms: Program[];

  submitted: boolean;

  programSize: number;

  nameExisted: boolean = false;

  editMode: boolean =true;

  visibility: boolean = false;

  status: string[] = ['Active', 'Inactive'];
  pattername: boolean=false;
  patternDes: boolean=false;

  AddProgram:string;

  constructor(
    private programService: ProgramService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {

    this.getProgramList();
  }

  ngDoCheck() {
    this.AddProgram=sessionStorage.getItem('AddProgram1');
    if(this.AddProgram=='true'){
      sessionStorage.removeItem("AddProgram1");
      this.openNew();
    }
  }  
  openNew() {
    this.program = {};
    this.submitted = false;
    this.programDialogue = true;
    this.editMode = true  
  }

   //pattern validation for  Name
patternDesc()
{
	 const pattern=/^[a-zA-Z][a-zA-Z0-9 -_]{1,25}.*/;
     if(!pattern.test(this.program.programDescription)){
		  this.patternDes=true;
		 return true;
	 } 
	 else{
	  this.patternDes=false;
	    return false;}
}
  patternName()
{
	 const pattern=/^[a-zA-Z][a-zA-Z0-9 ]{1,25}$/;
     if(!pattern.test(this.program.programName)){
		 this.pattername=true;
		 return true;
	 }
	 else{
	    this.pattername=false;
	    return false;}
}

  deleteSelectedPrograms() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected programs?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.programs = this.programs.filter(
          (val) => !this.selectedPrograms.includes(val)
        );
        this.selectedPrograms = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Programs Deleted',
          life: 3000,
        });
      },
    });
  }

  editProgram(program: Program) {
    this.editMode = false;
    this.program = { ...program };
    console.log('Edit Program Test' + this.program)
    this.programDialogue = true;
  }

  deleteProgram(program: Program) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + program.programName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.programs = this.programs.filter((val) => val.programId !== program.programId);
        this.programService.deleteProgram(program).subscribe(response => {
          console.log('a program is deleted');
        })
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Program Deleted',
          life: 3000,
        });
      },
    });
  }
  hideDialog() {
    this.programDialogue = false;
    this.submitted = false;
  }
  saveProgram() {
    this.submitted = true;
    if (this.program.programName && this.program.programDescription && this.program.programStatus && !this.pattername && !this.patternDes && !this.nameExisted) {
      if (this.program.programName.trim()) {
        if (this.program.programId) {
          this.programs[this.findIndexById(this.program.programId)] = this.program;

          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Program Updated',
            life: 3000,
          });

          this.programService.editProgram(this.program).subscribe((res) => {
            console.log('a program is updated')
          });
        } else {
          this.programSize = this.programSize + 1;
          this.program.programId = this.programSize.toString();
          this.programService.addProgram(this.program).subscribe((res) => {

            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Program Created Successfully',
              life: 3000,
            });
            this.getProgramList();
          }, (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Failed',
              detail: error,
              life: 3000,
            });
          });

        }
        this.programs = [...this.programs];
        this.programDialogue = false;
        this.program = {};
      }
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    if (this.programs !== undefined)
      for (let i = 0; i < this.programs.length; i++) {
        if (this.programs[i].programId === id) {
          index = i;
          break;
        }
      }
    return index;
  }

  private getMaxProgramId(max: number) {
    this.programs.forEach((character) => {
      const tempProgramId = Number(character.programId);

      if (tempProgramId > max) {
        max = tempProgramId;
      }
    });
    return max;
  }

  private getProgramList() {
    this.visibility = true;
    this.programService.getPrograms().subscribe((res) => {
      res = this.upperCaseProgramStatus(res);
      this.programs = res.filter(item=>item.programStatus.toLowerCase()==="active");
      this.programSize = this.getMaxProgramId(0);
      this.visibility = false;
    });
  }

  upperCaseProgramStatus(arr) {

    arr.forEach(element => {
      const status = element.programStatus.charAt(0).toUpperCase() + element.programStatus.substring(1).toLowerCase();
      element.programStatus = status;
    })
    return arr;

  }

  //Validation for "user name already exist or not"

  chkNameExisted(PName: string){
    if(this.programs.find(name => name.programName == PName)){
      this.nameExisted = true;
      return true;
    }
    else{
      this.nameExisted = false;
      return false;
    }
  }

}