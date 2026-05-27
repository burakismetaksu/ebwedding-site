export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f1eb] flex items-center justify-center px-6">
      <div className="w-full max-w-[720px] bg-[#f8f5f1] rounded-[2rem] shadow-2xl px-8 py-20 text-center relative">

        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-[#efe2cf] shadow-xl border border-[#d8c7b0] flex items-center justify-center">
          <div className="text-[#b49a7a] text-5xl tracking-[0.3em]">
            EB
          </div>
        </div>

        <div className="mt-12 tracking-[0.35em] text-[12px] md:text-[14px] leading-8 text-[#222]">
          EN ÖZEL ANIMIZA
          <br />
          ŞAHİTLİK ETMENİZDEN
          <br />
          MUTLULUK DUYARIZ
        </div>

        <div className="flex items-center justify-center gap-4 my-8 text-[#c98d97]">
          <div className="w-20 h-px bg-[#d9b5bb]" />
          ♡
          <div className="w-20 h-px bg-[#d9b5bb]" />
        </div>

        <div className="font-script text-[72px] md:text-[110px] leading-none text-black">
          Ece
          <span className="text-[#c98d97] mx-4">&</span>
          Burak
        </div>

        <div className="w-full h-px bg-[#d9b5bb] my-10" />

        <div className="tracking-[0.45em] text-[22px] text-[#222]">
          HAZİRAN 2026
        </div>

        <div className="mt-16 tracking-[0.18em] text-[13px] leading-8 text-[#222]">
          KONYAALTI BELEDİYESİ NİKAH SALONU
          <br />
          23 HAZİRAN 2026 • SAAT 15:30
        </div>

      </div>
    </main>
  );
}