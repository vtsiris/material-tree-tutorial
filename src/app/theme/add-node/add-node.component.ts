import { TreeData } from './../../service/tree-data.model';
import { Component, Inject, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css']
})
export class AddNodeComponent {
  @Output() addedNode = new EventEmitter;
  node: TreeData = {
    Id: null,
    Name: '',
    Description: '',
    Children: []
  };

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(NewNodeDialog, {
      width: '250px',
      data: {nodeName: this.node.Name, nodeDescription: this.node.Description}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.node.Name = result.nodeName;
        this.node.Description = result.nodeDescription;
        this.addedNode.emit(this.node);
      }
    });
  }
}

@Component({
  selector: 'app-new-node',
  templateUrl: 'new-node.html',
})
export class NewNodeDialog {

  constructor(
    public dialogRef: MatDialogRef<NewNodeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TreeData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
