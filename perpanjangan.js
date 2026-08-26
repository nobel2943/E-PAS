   ```javascript
/* ===========================================
   PERPANJANGAN.JS
   E-PAS BANDAR UDARA
=========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("formPerpanjangan");
    const pesanStatus = document.getElementById("pesanStatus");
    const btnKirim = document.getElementById("btnKirim");

    // Pastikan semua elemen ditemukan
    if (!form) {
        console.error("ERROR: formPerpanjangan tidak ditemukan!");
        return;
    }

    if (!pesanStatus) {
        console.error("ERROR: pesanStatus tidak ditemukan!");
        return;
    }

    if (!btnKirim) {
        console.error("ERROR: btnKirim tidak ditemukan!");
        return;
    }


    form.addEventListener("submit", function (e) {

        e.preventDefault();

        console.log("Tombol perpanjangan berhasil ditekan");


        // ==========================================
        // TOMBOL SEDANG DIPROSES
        // ==========================================

        btnKirim.disabled = true;
        btnKirim.innerText = "Sedang Mengirim...";


        try {

            // ==========================================
            // BUAT NOMOR PENGAJUAN
            // ==========================================

            const nomorPengajuan =
                "PRP-" + Date.now();


            // ==========================================
            // AMBIL DATA FORM
            // ==========================================

            const noPas =
                document.getElementById("noPas").value;

            const nama =
                document.getElementById("nama").value;

            const instansi =
                document.getElementById("instansi").value;

            const nik =
                document.getElementById("nik").value;

            const jenisPas =
                document.getElementById("jenisPas").value;

            const expired =
                document.getElementById("expired").value;


            // ==========================================
            // DATA PERPANJANGAN
            // ==========================================

            const data = {

                nomorPengajuan: nomorPengajuan,

                noPas: noPas,

                nama: nama,

                instansi: instansi,

                nik: nik,

                jenisPas: jenisPas,

                expired: expired,

                jenisPengajuan:
                    "Perpanjangan PAS",

                status:
                    "Menunggu",

                tanggalPengajuan:
                    new Date()
                        .toLocaleDateString("id-ID")

            };


            // ==========================================
            // AMBIL DATA LAMA
            // ==========================================

            let daftarPAS =
                JSON.parse(
                    localStorage.getItem("daftarPAS")
                ) || [];


            // ==========================================
            // TAMBAHKAN DATA BARU
            // ==========================================

            daftarPAS.push(data);


            // ==========================================
            // SIMPAN KE LOCALSTORAGE
            // ==========================================

            localStorage.setItem(
                "daftarPAS",
                JSON.stringify(daftarPAS)
            );


            // Simpan nomor terakhir
            localStorage.setItem(
                "nomorPengajuan",
                nomorPengajuan
            );


            console.log(
                "PERPANJANGAN BERHASIL:",
                data
            );


            // ==========================================
            // TAMPILKAN PESAN SUKSES
            // ==========================================

            pesanStatus.innerHTML = `
                <div style="
                    margin-top: 20px;
                    padding: 15px;
                    background: #d4edda;
                    color: #155724;
                    border-radius: 8px;
                    text-align: center;
                    font-weight: bold;
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
                </div>
            `;


            // Reset form
            form.reset();


            // Ubah tulisan tombol
            btnKirim.innerText =
                "Perpanjangan Berhasil Dikirim";


            // Pindah setelah 4 detik
            setTimeout(function () {

                window.location.href =
                    "status.html";

            }, 4000);


        } catch (error) {

            console.error(
                "ERROR PERPANJANGAN:",
                error
            );


            pesanStatus.innerHTML = `
                <div style="
                    margin-top: 20px;
                    padding: 15px;
                    background: #f8d7da;
                    color: #721c24;
                    border-radius: 8px;
                    text-align: center;
                    font-weight: bold;
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
```

                
