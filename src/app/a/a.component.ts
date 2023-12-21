import { Component, Type } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css'],
})
export class AComponent {
  inputJson!: { [key: string]: any };
  jsonTree!: TreeNode[];
  selectedFiles!: TreeNode<any> | TreeNode<any>[] | null;
  fieldJoiner = '.';
  isCollection = function (data: any): boolean {
    return Array.isArray(data) || typeof data === 'object';
  };

  ngOnInit() {
    // this.nodeService.getFiles().then((files) => (this.files1 = files));
    // this.nodeService.getFiles().then((files) => (this.jsonTree = files));
    this.initialize(1);
    this.jsonTree = this.formatNestedObject(this.inputJson, []);
    console.log(this.jsonTree);
  }

  formatNestedObject(dict: any, key: string[]): { [key: string]: any }[] {
    let current = [];
    for (const label in dict) {
      let keyNow = [...key, label];
      const val = dict[label];
      let children = null;
      const isArray = Array.isArray(val);
      if (val && !isArray && typeof val === 'object') {
        children = this.formatNestedObject(val, keyNow);
      } else if (isArray) {
        children = this.formatNestedObject(
          // val,
          val.filter((e) => this.isCollection(e)),
          keyNow
        );
        /* children = val.map((e, ind) => {
          return { key: [...keyNow, ind].join(fieldJoiner), label: e };
        }); */
      } /* else {
        children = [{ key: keyNow.join(fieldJoiner), label: val }];
      } */

      // let ff = [1, 2, 3, 4].reduce((a, b) => `${a}-${b}`, "");

      current.push({
        key: keyNow.join(this.fieldJoiner),
        label: label,
        children: children,
      });
    }
    return current;
  }

  expandAll() {
    this.jsonTree.forEach((node) => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.jsonTree.forEach((node) => {
      this.expandRecursive(node, false);
    });
  }

  selectAll() {
    // this.selectedFiles = [];
    // this.selectedFiles = [...this.jsonTree]; // Nice BUG
    this.selectedFiles = this.selectRecursive(this.jsonTree);
    this.selected();
  }

  deselectAll() {
    if (!this.selectedFiles || !confirm('DESELECT EVERYTHING?')) {
      return;
    }
    this.selectedFiles = [];
    this.selected();
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach((childNode) => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  private selectRecursive(node: TreeNode[]): any[] {
    let selected: any[] = [];
    node.forEach((childNode) => {
      selected.push(childNode);
      if (childNode.children) {
        selected = selected.concat(this.selectRecursive(childNode.children));
      }
    });
    return selected;
  }

  enableBtn() {
    if (Array.isArray(this.selectedFiles)) {
      return !(this.selectedFiles.length > 0);
    }
    return this.selectedFiles != null;
  }

  selected() {
    console.log('SELECTED ::: ', this.selectedFiles);
    let res: any;
    if (Array.isArray(this.selectedFiles)) {
      // res = this.selectedFiles.map((e) => e.key);
      let set = new Set();
      res = this.selectedFiles.forEach((e) => {
        set = new Set([...set, e.key]);
      });
      res = [...set];
    } else if (this.selectedFiles !== null) {
      res = [this.selectedFiles.key];
    } else {
      res = [];
    }

    console.log('DES CHECK :: ', this.selectedFiles);
    console.log('RES ::: ', res);
  }

  initialize(i: number) {
    const arr = [
      {
        Key1: 'Value1',
        Key2: ['Str1', 'Str2'],
        Key3: [
          { ARRkey1: 'ARRvalue1', ARRkey2: ['ARRvalue2', { ABCD: '22222' }] },
          { ARRkey1: 'ARRvalue1', ARRkey2: 'ARRvalue2' },
          '132',
        ],
        Key4: {
          nkey1: 'nvalue1',
          nkey2: { nnkey1: ['nnvalue1', 'nested val 1'], nnkey2: 'nnvalue2' },
        },
      },
      {
        id: '9521252315',
        customer: {
          ID: '100000001289406',
          address: {
            addressLine1: '3100 Main Av',
            city: 'Manama',
            country: 'BH',
            state: 'BH',
            zip: '34355',
          },
          contact: {
            email: 'daytest@bfc.com',
            phoneNumber: '123456789',
          },
          createdDate: '2023-08-25T13:24:43.123Z',
          customerName: 'SHELTON BENJAMIN',
          customerNumber: '100000001289309',
          dobOrRest: '2020-07-10',
          firstName: 'SHELTON',
          gender: 'MALE',
          idType: 'CPR',
          identification: [
            {
              type: 'CPR',
              value: '584758693',
            },
          ],
          isActive: true,
          lastName: 'BENJAMIN',
          programName: 'PLCBW1',
          ssnTaxOtherID: '584758693',
          status: 'ACTIVE',
          title: 'Mr',
          updatedDate: '2023-08-25T13:24:43.123Z',
          userType: 'INDIVIDUAL',
        },
        mfp: null,
        replyTo: '_INBOX.4osRGiTz49MQdmEIOw3oJt',
        requestTime: '2023-09-25T09:53:49.766155642Z',
        reversed: false,
        streamName: 'PLFI',
        transaction: {
          CeReject: false,
          accountCategory: 'WPS',
          accountID: ['154981158'],
          acquiringCountryCode: '818',
          cardAcceptorLocation: 'Heritage Village Restaurant and Cafe    ',
          channel: 'GPS',
          createdDate: '2023-09-25T09:53:49.737078698Z',
          credit: false,
          creditorAccount: {
            settlementAccountName: 'PLCBW1SETTLEMENT',
            settlementAccountNumber: '123',
          },
          customerId: '100000001289309',
          debtorAccount: {
            accountId: '154981158',
            accountLevel: 'WPS',
            accountNumber: '200279335988649',
            customerAccountName: 'General Account',
            customerAccountNumber: '200279335988649',
            // customerAccountType: "WALLET", // Changed Here :::
            customerAccountType: 'WALLET123',
            customerNumber: '100000001289309',
            holderId: '584758693',
            holderIdType: 'CPR',
            holderName: 'SHELTON BENJAMIN',
            party: {
              contact: {
                email: 'sheltonbenjamin@bfc.com',
                phoneNumber: '52142536',
              },
            },
          },
          eftBatchID: '',
          eftBatchStatus: '',
          eftReported: false,
          erpPosted: false,
          escrowReported: false,
          glReferenceID: '91ea7e0f54834b809df2f073e1e2ff76',
          id: 'id',
          instructedAmount: 550,
          instructedCurrency: 'BHD',
          // instructedCurrency: "PHD", // Changed Here :::
          isRecon: false,
          isVisaRecon: false,
          mcc: '1113',
          operationId: 'e588c5e426154b2781a568598bb98640',
          originalReference: '337eb70c1447443c8bc2f907426a98ac',
          postedDate: '2023-09-25T09:53:49.737077476Z',
          processId: 'R02503002899',
          product: 'LEDGER1',
          program: 'PLCBW1',
          referenceID: '337eb70c1447443c8bc2f907426a98ac',
          reversingField: '0200303143092515234904801000000',
          rrn: 'R02503002899',
          signature: 'keyId=3659',
          statementDescription: 'Heritage Village Restaurant and Cafe    ',
          status: 'PENDING',
          subTransactionType: 'GPS_PURCHASE_POS_BENEFIT',
          transactionNumber: 'QA00000004246046',
          transactionType: 'REMIT',
          updatedDate: '2023-10-16T09:53:49.737079899Z',
          wpsReported: false,
        },
      },
    ];

    this.inputJson = arr[i];
  }
}
