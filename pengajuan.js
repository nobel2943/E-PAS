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
// FORM PENGAJUAN
// ================================

const form = document.getElementById("formPengajuan");
const pesanStatus = document.getElementById("pesanStatus");
const btnKirim = document.getElementById("btnKirim");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    console.log("Tombol kirim berhasil ditekan");

    pesanStatus.innerHTML = `
        <p style="color:blue; font-weight:bold;">
            Sedang mengirim pengajuan...
        </p>
    `;

    btnKirim.disabled = true;
    btnKirim.innerText = "Mengirim...";

    try {

        // Ambil data form
        const nama = document.getElementById("nama").value;
        const nik = document.getElementById("nik").value;
        const instansi = document.getElementById("instansi").value;
        const jabatan = document.getElementById("jabatan").value;
        const no_hp = document.getElementById("no_hp").value;
        const email = document.getElementById("email").value;

        const jenis_pengajuan =
            document.getElementById("jenis_pengajuan").value;

        const keperluan =
            document.getElementById("keperluan").value;


        // Nomor pengajuan
        const nomorPengajuan =
            "PAS-" + Date.now();


        // ================================
        // SIMPAN KE DATABASE
        // ================================

        const { data, error } =
            await supabaseClient
                .from("pengajuan_pas")
                .insert([
                    {
                        nomor_pengajuan: nomorPengajuan,
                        nama_pemohon: nama,
                        nik: nik,
                        instansi: instansi,
                        jabatan: jabatan,
                        no_hp: no_hp,
                        email: email,
                        jenis_pengajuan: jenis_pengajuan,
                        keperluan: keperluan,
                        tanggal_pengajuan:
                            new Date().toISOString().split("T")[0],
                        status: "Menunggu"
                    }
                ])
                .select();


        if (error) {
            throw error;
        }


        // ================================
        // BERHASIL
        // ================================

        console.log("BERHASIL!", data);

        pesanStatus.innerHTML = `
            <div style="
                background:#d4edda;
                color:#155724;
                padding:15px;
                margin-top:20px;
                border-radius:8px;
                font-weight:bold;
            ">
                ✓ Pengajuan PAS berhasil dikirim!

                <br><br>

                Nomor Pengajuan Anda:
                <br>
                ${nomorPengajuan}

                <br><br>

                Silakan simpan nomor pengajuan ini
                untuk mengecek status pengajuan.
            </div>
        `;

        localStorage.setItem(
            "nomorPengajuan",
            nomorPengajuan
        );

        form.reset();

        btnKirim.innerText =
            "Pengajuan Berhasil Dikirim";

    } catch (error) {

        console.error("ERROR:", error);

        pesanStatus.innerHTML = `
            <div style="
                background:#f8d7da;
                color:#721c24;
                padding:15px;
                margin-top:20px;
                border-radius:8px;
                font-weight:bold;
            ">
                ✗ Pengajuan gagal dikirim.

                <br><br>

                Error:
                ${error.message}
            </div>
        `;

        btnKirim.disabled = false;
        btnKirim.innerText =
            "Kirim Pengajuan";
    }

});
