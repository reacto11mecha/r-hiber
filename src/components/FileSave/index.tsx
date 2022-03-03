import CardBuilder from "@/HOC/CardBuilder";

function FileSave() {
  return (
    <CardBuilder title="Pengaturan Port Arduino">
      <p>
        Mengatur file saving dimana laporan penerbangan harus disimpan. Pilih
        direktori yang ingin dituju.
      </p>
    </CardBuilder>
  );
}

export default FileSave;
