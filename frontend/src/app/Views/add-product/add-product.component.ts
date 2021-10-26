import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import conn from '../../Modules/apiconnection';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  name: string
  price: number
  imageUrl: string
  description: string

  constructor(private router: Router) {
    this.name = "";
    this.price = 0;
    this.imageUrl = "";
    this.description = "";
  }

  ngOnInit(): void {
  }

  async submit(): Promise<void> {
    if (!confirm("追加しますか？")) { return; }
    
    var params = new URLSearchParams();
    params.append("name", this.name);
    params.append("price", this.price.toString()!);
    params.append("imageUrl", this.imageUrl);
    params.append("description", this.description);

    const res = await conn.post("/admin/product/add", params);
    if (res.status != 200 || !res.json.result) {
      alert("追加に失敗しました。");
      return;
    }

    alert("追加しました。");
    this.router.navigate(["/admin_top"]);
  }

}
