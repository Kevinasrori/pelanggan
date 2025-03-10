import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyDBwb2pt0Namd7W8q6fT4tyx1fcY7qX5pQ",
  authDomain: "pelanggan-1e5c3.firebaseapp.com",
  projectId: "pelanggan-1e5c3",
  storageBucket: "pelanggan-1e5c3.firebasestorage.app",
  messagingSenderId: "253984917517",
  appId: "1:253984917517:web:8404546b6004a5a0316d44",
  measurementId: "G-EJQ595DK9F"
};

// fungsi daftar pelanggan 
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function ambilDaftarPelanggan() {
  const refDokumen = collection(basisdata, "Pelanggan");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      alamat: dokumen.data(). alamat,
      notelpon: dokumen.data(). notelpon
    })
  })

  return hasilKueri;
}


export async function hapuspelanggan(id) {
  await deleteDoc(doc(basisdata, "pelanggan", id))
}


export async function tambahPelanggan(nama, alamat, notelpon) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "pelanggan"), {
      nama: nama,
      alamat: alamat,
      notelpon: notelpon
    })

    // menampilkan pesan berhasil
    console.log("berhasil menyimpan data pelanggan")
  } catch (error) {
    // menampilkan pesan gagal
    console.log("gagal menyimpan data pelanggan")
  }
}

export async function hapusPelanggan(id) {
  await deleteDoc(doc(basisdata, "pelanggan", id))
}
export async function ubahPelanggan(id, namabaru, alamatbaru, nohapebaru) {
  await updateDoc(
    doc(basisdata, "pelanggan", id),
    { nama: namabaru, alamat: alamatbaru, notelpon: notelponbaru }
    )
}

export async function ambilPelanggan(id) {
  const refDokumen = await doc(basisdata, "pcoelanggan", id)
  const snapshotDokumen = await getDoc(refDokumen)
  
  return await snapshotDokumen.data()
}