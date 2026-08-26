// ================================
// KONFIGURASI SUPABASE
// ================================

const SUPABASE_URL = "https://cucyzdqexcspjlymryi.supabase.co";

const SUPABASE_KEY = "sb_publishable_e5b12jPjqKsA8NN_rvb_kg_8NHA1okq";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ================================
// JALANKAN SETELAH HALAMAN TERBUKA
// ================================

document.addEventListener("DOMContentLoaded", function () {

    // Ambil elemen form
    const form = document.getElementById("formPengajuan");
    const pesanStatus = document.getElementById("pesanStatus");
    const btnKirim = document.getElementById("btnKirim");

    // Cek apakah elemen ditemukan
    if (!form) {
        console.error("Form Pengajuan tidak ditemukan!");
        return;
    }


    // ================================
    // KETIKA FORM DIKIRIM
    // ================================

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        console.log("Tombol Kirim Pengajuan ditekan");


        // Pesan sedang mengirim
        pesanStatus.innerHTML = `
            <div style="
                background:#e3f2fd;
                color:#0d47a1;
                padding:15px;
                margin-top:20px;
                border-radius:8px;
                font-weight:bold;
            ">
                Sedang mengirim pengajuan...
            </div>
        `;


        // Nonaktifkan tombol sementara
        btnKirim.disabled = true;
        btnKirim.innerText = "Mengirim...";


        try {

            // ================================
            // AMBIL DATA DARI FORM
            // ================================

            const namaPemohon =
                document.getElementById("nama_pemohon").value.trim();

            const nik =
                document.getElementById("nik").value.trim();

            const instansi =
                document.getElementById("instansi").value.trim();

            const jabatan =
                document.getElementById("jabatan").value.trim();

            const noHp =
                document.getElementById("no_hp").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const jenisPengajuan =
                document.getElementById("jenis_pengajuan").value;

            const keperluan =
                document.getElementById("keperluan").value.trim();


            // ================================
            // BUAT NOMOR PENGAJUAN
            // ================================

            const nomorPengajuan =
                "PAS-" + Date.now();


            // ================================
            // SIMPAN KE SUPABASE
            // ================================

            const { data, error } = await supabaseClient
                .from("pengajuan_pas")
                .insert([
                    {
                        nomor_pengajuan: nomorPengajuan,
                        nama_pemohon: namaPemohon,
                        nik: nik,
                        instansi: instansi,
                        jabatan: jabatan,
                        no_hp: noHp,
                        email: email,
                        jenis_pengajuan: jenisPengajuan,
                        keperluan: keperluan,
                        tanggal_pengajuan: new Date()
                            .toISOString()
                            .split("T")[0],
                        status: "Menunggu"
                    }
                ])
                .select();


            // Jika ada error dari Supabase
            if (error) {
                throw error;
            }


            // ================================
            // PENGAJUAN BERHASIL
            // ================================

            console.log("Pengajuan berhasil:", data);


            // Simpan nomor pengajuan
            localStorage.setItem(
                "nomorPengajuan",
                nomorPengajuan
            );


            // Tampilkan pesan berhasil
            pesanStatus.innerHTML = `
                <div style="
                    background:#d4edda;
                    color:#155724;
                    padding:18px;
                    margin-top:20px;
                    border-radius:8px;
                    font-weight:bold;
                    line-height:1.7;
                ">
                    ✓ Pengajuan PAS berhasil dikirim!

                    <br><br>

                    Nomor Pengajuan Anda:
                    <br>

                    <span style="
                        font-size:18px;
                    ">
                        ${nomorPengajuan}
                    </span>

                    <br><br>

                    Silakan simpan nomor pengajuan ini
                    untuk mengecek status pengajuan.
                </div>
            `;


            // Reset form
            form.reset();


            // Ubah tombol
            btnKirim.innerText =
                "Pengajuan Berhasil Dikirim";


            // Aktifkan kembali tombol setelah beberapa saat
            setTimeout(function () {

                btnKirim.disabled = false;
                btnKirim.innerText = "Kirim Pengajuan";

            }, 3000);


        } catch (error) {

            console.error("ERROR PENGAJUAN:", error);


            // ================================
            // PESAN GAGAL
            // ================================

            pesanStatus.innerHTML = `
                <div style="
                    background:#f8d7da;
                    color:#721c24;
                    padding:15px;
                    margin-top:20px;
                    border-radius:8px;
                    font-weight:bold;
                    line-height:1.6;
                ">
                    ✗ Pengajuan gagal dikirim.

                    <br><br>

                    ${error.message}
                </div>
            `;


            // Aktifkan tombol kembali
            btnKirim.disabled = false;
            btnKirim.innerText =
                "Kirim Pengajuan";
        }

    });

});
