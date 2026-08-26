/* ===========================================
   PERPANJANGAN.JS
   E-PAS BANDAR UDARA
=========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formPerpanjangan");
    const pesanStatus = document.getElementById("pesanStatus");
    const btnKirim = document.getElementById("btnKirim");

    // Cek apakah form ditemukan
    if (!form) {
        console.error("Form perpanjangan tidak ditemukan!");
        return;
    }

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        // Ubah tombol saat sedang mengirim
        btnKirim.disabled = true;
        btnKirim.innerText = "Sedang Mengirim...";

        // Buat nomor pengajuan
        const nomorPengajuan =
            "PRP-" +
            Date.now();

        // Ambil data form
        const data = {

            nomorPengajuan: nomorPengajuan,

            noPas:
                document.getElementById("noPas").value,

            nama:
                document.getElementById("nama").value,

            instansi:
                document.getElementById("instansi").value,

            nik:
                document.getElementById("nik").value,

            jenisPas:
                document.getElementById("jenisPas").value,

            expired:
                document.getElementById("expired").value,

            jenisPengajuan:
                "Perpanjangan PAS",

            status:
                "Menunggu",

            tanggalPengajuan:
                new Date().toLocaleDateString("id-ID")

        };

        try {

            // Ambil data lama
            let daftarPAS =
                JSON.parse(
                    localStorage.getItem("daftarPAS")
                ) || [];


            // Tambahkan data baru
            daftarPAS.push(data);


            // Simpan data
            localStorage.setItem(
                "daftarPAS",
                JSON.stringify(daftarPAS)
            );


            // Simpan nomor pengajuan terakhir
            localStorage.setItem(
                "nomorPengajuan",
                nomorPengajuan
            );


            // =========================
            // TAMPILKAN PESAN SUKSES
            // =========================

            pesanStatus.innerHTML = `
                <div style="
                    margin-top:20px;
                    padding:15px;
                    background:#d4edda;
                    color:#155724;
                    border-radius:8px;
                    text-align:center;
                    font-weight:bold;
                ">
                    ✓ PERPANJANGAN PAS BERHASIL DIKIRIM!
                    <br><br>
                    Nomor Pengajuan Anda:
                    <br>
                    <span style="font-size:18px;">
                        ${nomorPengajuan}
                    </span>
                    <br><br>
                    Data berhasil disimpan.
                    Anda akan diarahkan ke halaman status...
                </div>
            `;


            // Reset form
            form.reset();


            // Tunggu 4 detik agar pesan terlihat
            setTimeout(function () {

                window.location.href =
                    "status.html";

            }, 4000);


        } catch (error) {

            console.error(error);

            pesanStatus.innerHTML = `
                <div style="
                    margin-top:20px;
                    padding:15px;
                    background:#f8d7da;
                    color:#721c24;
                    border-radius:8px;
                    text-align:center;
                    font-weight:bold;
                ">
                    ✗ PERPANJANGAN GAGAL DIKIRIM!
                    <br><br>
                    ${error.message}
                </div>
            `;

            btnKirim.disabled = false;
            btnKirim.innerText =
                "Ajukan Perpanjangan";
        }

    });

});
