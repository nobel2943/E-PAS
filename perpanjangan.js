      ```javascript
/* ===========================================
   PERPANJANGAN.JS
   E-PAS BANDAR UDARA
=========================================== */


// ==========================================
// KONFIGURASI SUPABASE
// ==========================================

const SUPABASE_URL =
    "https://cucyzdqexcspjlymryi.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_e5b12jPjqKsA8NN_rvb_kg_8NHA1okq";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ==========================================
// JALANKAN SETELAH HALAMAN SIAP
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const form =
        document.getElementById("formPerpanjangan");

    const pesanStatus =
        document.getElementById("pesanStatus");

    const btnKirim =
        document.getElementById("btnKirim");


    // ==========================================
    // CEK APAKAH FORM ADA
    // ==========================================

    if (!form) {
        console.error(
            "Form perpanjangan tidak ditemukan!"
        );
        return;
    }


    // ==========================================
    // SAAT FORM DIKIRIM
    // ==========================================

    form.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            // Ubah tombol
            if (btnKirim) {

                btnKirim.disabled = true;
                btnKirim.innerText =
                    "Sedang Mengirim...";

            }


            // Pesan proses
            if (pesanStatus) {

                pesanStatus.innerHTML = `
                    <p style="
                        color:blue;
                        font-weight:bold;
                        margin-top:20px;
                    ">
                        Sedang mengirim perpanjangan PAS...
                    </p>
                `;

            }


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
                // SIMPAN KE SUPABASE
                // ==========================================

                const { data, error } =
                    await supabaseClient
                        .from("pengajuan_pas")
                        .insert([
                            {

                                nomor_pengajuan:
                                    nomorPengajuan,

                                nama_pemohon:
                                    nama,

                                nik:
                                    nik,

                                instansi:
                                    instansi,

                                jenis_pengajuan:
                                    "Perpanjangan PAS",

                                jenis_pas:
                                    jenisPas,

                                no_pas:
                                    noPas,

                                tanggal_berakhir:
                                    expired,

                                tanggal_pengajuan:
                                    new Date()
                                        .toISOString()
                                        .split("T")[0],

                                status:
                                    "Menunggu"

                            }
                        ])
                        .select();


                // Jika ada error
                if (error) {

                    throw error;

                }


                console.log(
                    "Perpanjangan berhasil:",
                    data
                );


                // ==========================================
                // SIMPAN NOMOR PENGAJUAN TERAKHIR
                // ==========================================

                localStorage.setItem(
                    "nomorPengajuan",
                    nomorPengajuan
                );


                // ==========================================
                // TAMPILKAN PESAN BERHASIL
                // ==========================================

                if (pesanStatus) {

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

                            <span style="
                                font-size:18px;
                            ">
                                ${nomorPengajuan}
                            </span>

                            <br><br>

                            Data berhasil disimpan.

                            <br>

                            Anda akan diarahkan
                            ke halaman status...
                        </div>
                    `;

                }


                // Reset form
                form.reset();


                // ==========================================
                // PINDAH KE HALAMAN STATUS
                // ==========================================

                setTimeout(function () {

                    window.location.href =
                        "status.html";

                }, 4000);


            } catch (error) {


                console.error(
                    "ERROR PERPANJANGAN:",
                    error
                );


                // ==========================================
                // PESAN GAGAL
                // ==========================================

                if (pesanStatus) {

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

                }


                // Aktifkan kembali tombol
                if (btnKirim) {

                    btnKirim.disabled = false;

                    btnKirim.innerText =
                        "Ajukan Perpanjangan";

                }

            }

        }
    );

});
```

            
