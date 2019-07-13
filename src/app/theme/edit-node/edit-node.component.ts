import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { TreeData } from 'src/app/service/tree-data.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-node',
  templateUrl: './edit-node.component.html',
  styleUrls: ['./edit-node.component.css']
})
export class EditNodeComponent {

  @Input() isTop: boolean;
  @Input() currentNode: TreeData;
  @Output() addedNode = new EventEmitter;
  name: string;
  description: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(EditNodeDialog, {
      width: '250px',
      data: {nodeName: this.name, nodeDescription: this.description}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const node: TreeData = {
          Id: null,
          Name: result.nodeName,
          Description: result.nodeDescription,
          Children: []
        };
        if (this.isTop) {
          this.addedNode.emit(node);
        } else {
          this.addedNode.emit({currentNode: this.currentNode, node: node});
        }
      }
    });
  }
}

@Component({
  selector: 'app-edit-node-dialog',
  templateUrl: 'edit-node-dialog.html',
})
export class EditNodeDialog {

  constructor(
    public dialogRef: MatDialogRef<EditNodeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TreeData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
