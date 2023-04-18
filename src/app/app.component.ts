import { Component } from '@angular/core';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { Product } from './iProduct';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      :host ::ng-deep button {
        margin-right: 0.25em;
      }

      :host ::ng-deep .p-dialog {
        max-height: fit-content;

        .p-dialog-content {
          width: 25vw;
        }
      }

      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        flex-direction: column;

        span,
        p,
        ol {
          width: 75vw;
        }

        p-button {
          margin-bottom: 10px;
        }
      }
    `,
  ],
  providers: [ConfirmationService],
})
export class AppComponent {
  msgs: Message[] = [];

  position: string = '';

  display: boolean = false;
  productsLg: Product[] = [];

  constructor(
    private readonly confirmationService: ConfirmationService,
    private readonly primengConfig: PrimeNGConfig,
    private readonly productService: ProductService
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.productService.getProductsLarge().subscribe((data) => {
      this.productsLg = data;
    });
  }

  confirm1() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [
          {
            severity: 'info',
            summary: 'Confirmed',
            detail: 'You have accepted',
          },
        ];
      },
      reject: () => {
        this.msgs = [
          {
            severity: 'warn',
            summary: 'Rejected',
            detail: 'You have rejected',
          },
        ];
      },
    });
  }

  showDialog() {
    this.display = true;
  }
}
