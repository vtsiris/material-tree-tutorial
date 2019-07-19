import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { TreeData, DialogData } from '../../service/tree-data.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-node',
  templateUrl: './edit-node.component.html',
  styleUrls: ['./edit-node.component.css']
})
export class EditNodeComponent {

  @Input() isTop: boolean;
  @Input() currentNode: TreeData;
  @Output() edittedNode = new EventEmitter;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(EditNodeDialog, {
      width: '250px',
      data: {Name: this.currentNode.Name, Description: this.currentNode.Description, Component: 'Edit'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const node: TreeData = {
          Id: null,
          Name: result.nodeName,
          Description: result.nodeDescription,
          Children: this.currentNode.Children
        };
        this.edittedNode.emit({currentNode: this.currentNode, node: node});
      }
    });
  }
}



@Component({
  selector: 'app-edit-node-dialog',
  templateUrl: '../node-dialog/node-dialog.html',
})

export class EditNodeDialog {
  constructor(
    public dialogRef: MatDialogRef<EditNodeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
