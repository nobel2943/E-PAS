/* ==========================================
   DETAIL_ADMIN.JS
   E-PAS BANDAR UDARA
========================================== */

let indexData = -1;

document.addEventListener("DOMContentLoaded", function () {

    let data = JSON.parse(localStorage.getItem("detailPAS"));

    indexData = localStorage.getItem("detailIndex");

    if (!data) return;

    document.getElementById("registrasi").innerHTML = data.registrasi;
    document.getElementById("nama").innerHTML = data.nama;
    document.getElementById("nik").innerHTML = data.nik;
    document.getElementById("instansi").innerHTML = data.instansi;
    document.getElementById("jabatan").innerHTML = data.jabatan;
    document.getElementById("telepon").innerHTML = data.telepon;
    document.getElementById("email").innerHTML = data.email;
    document.getElementById("jenisPas").innerHTML = data.jenisPas;
    document.getElementById("jenisPengajuan").innerHTML = data.jenisPengajuan;
    document.getElementById("tanggal").innerHTML = data.tanggal;
    document.getElementById("status").innerHTML = data.status;

});

function setujuiDetail(){

    let daftarPAS = JSON.parse(localStorage.getItem("daftarPAS")) || [];

    daftarPAS[indexData].status = "Disetujui";

    localStorage.setItem(
        "daftarPAS",
        JSON.stringify(daftarPAS)
    );

    alert("Pengajuan berhasil disetujui.");

    window.location.href="admin.html";

}

function tolakDetail(){

    let daftarPAS = JSON.parse(localStorage.getItem("daftarPAS")) || [];

    daftarPAS[indexData].status = "Ditolak";

    localStorage.setItem(
        "daftarPAS",
        JSON.stringify(daftarPAS)
    );

    alert("Pengajuan ditolak.");

    window.location.href="admin.html";

}
