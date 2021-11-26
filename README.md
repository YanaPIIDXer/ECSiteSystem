# ECSiteSystem
ECサイトシステム。AngularとSpringBootのポートフォリオ

## 使用技術

|Key|Value|Source|
|---|---|---|
|フロントエンド|Angular|[frontend/src/以下](https://github.com/YanaPIIDXer/ECSiteSystem/tree/main/frontend/src)|
|バックエンド|Java + SpringBoot|[backend/ecsite/以下](https://github.com/YanaPIIDXer/ECSiteSystem/tree/main/backend/ecsite)|
|決済システム|Stripe|---|

## このシステムで実現する事

### 共通

- 一般ユーザ及び管理者としてログイン・ログアウト

### 一般ユーザ
- 商品の購入
- 購入して未発送の商品の注文キャンセル
- 購入履歴の閲覧
- 登録情報の変更

### 管理者
- 商品の登録
- 購入された商品の発送及びキャンセル
