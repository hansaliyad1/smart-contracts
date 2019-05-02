import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validate} from "codelyzer/walkerFactory/walkerFn";

@Component({
  selector: 'app-assets-info',
  templateUrl: './assets-info.component.html',
  styleUrls: ['./assets-info.component.css']
})
export class AssetsInfoComponent implements OnInit {
  private currentUrl: Params;
  messageClass: string;
  message: string;
  asset_info;
  public form: FormGroup;
  public processing: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.createTransferAssetForm();
  }

  private createTransferAssetForm() {
    this.form = this.formBuilder.group({
      newowner_public_key: ['', Validators.required],
      currentowner_private_key: ['', Validators.required],
      metadata: ['', Validators.required]
    });
  }

  // Function to disable form
  private disableForm() {
    this.form.disable();
  }

  // Function to enable form
  private enableForm() {
    this.form.enable();
  }

  public onTransferAsset() {
    this.processing = true;
    this.disableForm();

    const key = {
      newowner_public_key: this.form.get('newowner_public_key').value,
      txid: this.currentUrl.txid,
      currentowner_private_key: this.form.get('currentowner_private_key').value,
      metadata: this.form.get('metadata').value
    };

    this.authService.transferAsset(key).subscribe(response => {
      if (!response.success) {
        this.messageClass = 'alert alert-danger';
      }
      else {
        this.messageClass = 'alert alert-success';
      }

      this.message = response.message;

      setTimeout(() => {
        this.enableForm();
        this.processing = false;
      }, 3000)
    });
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;

    this.authService.retrieveAssetInfo(this.currentUrl.txid).subscribe(response => {
      if (!response.success) {
        this.messageClass = 'alert alert-danger'
      }
      else {
        this.messageClass = 'alert alert-success';
        this.asset_info = response.info;
      }

      this.message = response.message;

    })
  }

}
