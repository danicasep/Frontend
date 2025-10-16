# Arjunane Template for React

## Source Code ini digunakan untuk _template_ atau wadah (_container_) untuk pengembangan sebuah aplikasi menggunakan **React**, khususnya untuk **Website Developing**

___

## _Template_ ini menggunakan beberapa **Framework**:
- Next JS (Sebagai Framework untuk _Frontend_)
- Material UI (Sebagai Framework untuk kerangka kerja _Style_/CSS)

## 1. Langkah installasi:
### Berhubung repo template nya masih _private_ jadi lakukan langkah berikut:
- Masukkan perintah berikut di CLI: 

``` sh
git clone https://username-gitlab-anda@gitlab.com/arjunane/arjunane-mui
```

### Ketika sudah di _publish_ untuk umum:
- Masukkan perintah berikut di CLI:
```sh
git clone https://gitlab.com/arjunane/arjunane-mui.git
```

- Jalankan perintah berikut untuk mengunduh _packages_ yang dibutuhkan dari **Arjunane React**
  - Apabila menggunakan NPM
  ```sh
  npm install
  ```
  - Apabila menggunakan Yarn
  ```sh
  yarn install
  ```
- Ketika pengunduhan telah selesai, jalankan perintah berikut untuk menjalankan _local server_ untuk FE nya:
  - Apabila menggunakan NPM
  ```sh
  npm run dev
  ```
  - Apabila menggunakan Yarn
  ```sh
  yarn dev
  ```
- Kemudian akses ```localhost:3000``` di Borwser anda

## 2. Dokumentasi sederhana untuk **Arjunane React**
- Folder **src** digunakan untuk _root_ folder dalam pengembangan sebuah aplikasi
- Didalam folder **src/resources** terdapat 3 _folders_ yaitu ```interfaces, pages,``` dan ```views```
  - Folder ```src/resources/pages``` digunakan untuk membuat _logic bussiness_
  - Folder ```src/resources/views``` digunakan untuk membuat tampilan
  - Folder ```src/resources/interfaces``` digunakan untuk membuat _core principal_ untuk ```pages``` dan ```views```
- Folder **server/controllers** digunakan untuk mengeksekusi perintah didalam _middleware chain_

## 3. CLI Arjunane React
Beberapa _command_ yang tersedia di Arjunane CLI
- Membuat file untuk ```interfaces, pages,``` dan ```views```, jalankan perintah berikut
```sh
node arjunane page namaFile
```
atau
```sh
node arjunane page namaFolder/namaFile
```