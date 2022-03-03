import CardBuilder from "@/HOC/CardBuilder";

function ArduinoPort() {
  return (
    <CardBuilder title="Pengaturan Port Arduino">
      <p>
        Mengatur dimana port arduino terhubung dengan komputer ini. Pilih port
        yang sesuai komputer ground station.
      </p>
    </CardBuilder>
  );
}

export default ArduinoPort;
