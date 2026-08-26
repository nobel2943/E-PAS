/* ==========================================
   ADMIN.JS
   E-PAS BANDAR UDARA
========================================== */

document.addEventListener("DOMContentLoaded", tampilAdmin);

function tampilAdmin() {

    let daftarPAS = JSON.parse(localStorage.getItem("daftarPAS")) || [];

    let tbody = document.getElementById("dataPengajuan");

    if (!tbody) return;

    tbody.innerHTML = "";

    let total = daftarPAS.length;
    let menunggu = 0;
    let disetujui = 0;
    let ditolak = 0;

    daftarPAS.forEach(function (data, index) {

        if (data.status === "Menunggu Verifikasi") {

            menunggu++;

        } else if (data.status === "Disetujui") {

            disetujui++;

        } else if (data.status === "Ditolak") {

            ditolak++;

        }

        tbody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${data.registrasi}</td>

            <td>${data.nama}</td>

            <td>${data.instansi}</td>

            <td>${data.jenisPas}</td>

            <td>${data.status}</td>

            <td>

                <button onclick="detailData(${index})">
                    Detail
                </button>

                <button onclick="setujui(${index})">
                    Setuju
