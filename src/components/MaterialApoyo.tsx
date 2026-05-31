import { FileText, Printer } from 'lucide-react';

const MaterialApoyo = () => {
  const canvaUrl = 'https://canva.link/adx2b1x7znaf0lv';
  const canvaEmbedUrl = 'https://www.canva.com/design/DAHJtArEEWI/oDtW75mIuqhG_Ayql_RKmA/view?embed';
  const canvaDownloadPdfUrl = '/Handbook%20TEREMUN%20XIV.pdf';
  const canvaDownloadPrintableUrl = 'https://drive.google.com/file/d/1UjXA9PaGXo1chnVcycZ56qgWWbVAtykx/view';

  return (
    <section id="material-apoyo" className="py-20 bg-teremun-blush/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-dm-serif-display text-5xl sm:text-6xl font-bold text-teremun-dark mb-4">
            Material de Apoyo
          </h2>
          <div className="w-24 h-1 bg-teremun-gold mx-auto mb-6"></div>
          <p className="text-xl text-teremun-mahogany max-w-3xl mx-auto">
            Recursos para preparar mejor cada comisión y fortalecer tus habilidades de debate.
          </p>
        </div>

        <div className="mt-10 mx-auto w-full max-w-[640px] relative">
          <h3 className="font-dm-serif-display text-3xl sm:text-4xl font-bold text-teremun-gold text-center mb-4">
            Handbook
          </h3>

          <div className="relative w-full overflow-hidden rounded-2xl border border-teremun-burgundy/20 shadow-xl bg-white aspect-[707/1000]">
            <iframe
              src={canvaEmbedUrl}
              title="Material Canva TEREMUN"
              className="absolute -top-[2px] left-0 w-full h-[calc(100%+3px)] border-0"
              loading="lazy"
              allow="fullscreen"
              allowFullScreen
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[3px] bg-white" />
          </div>

          <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-[96%] flex-col gap-4">
            <a
              href={canvaDownloadPdfUrl}
              download="Handbook TEREMUN XIV.pdf"
              className="relative inline-flex items-center gap-2.5 bg-white text-teremun-dark border border-teremun-burgundy/30 px-5 py-3.5 pr-9 shadow-md hover:shadow-lg hover:bg-[#ead7d5] transition-all"
              style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 18px) 50%, 100% 100%, 0 100%)' }}
            >
              <FileText size={19} className="text-teremun-burgundy" />
              <span className="text-[15px] font-semibold">PDF</span>
            </a>

            <a
              href={canvaDownloadPrintableUrl}
              target="_blank"
              rel="noreferrer"
              className="relative inline-flex items-center gap-2.5 bg-white text-teremun-dark border border-teremun-burgundy/30 px-5 py-3.5 pr-9 shadow-md hover:shadow-lg hover:bg-[#ead7d5] transition-all"
              style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 18px) 50%, 100% 100%, 0 100%)' }}
            >
              <Printer size={19} className="text-teremun-burgundy" />
              <span className="text-[15px] font-semibold">Imprimible</span>
            </a>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 lg:hidden">
            <a
              href={canvaDownloadPdfUrl}
              download="Handbook TEREMUN XIV.pdf"
              className="inline-flex items-center justify-center gap-2.5 border border-teremun-burgundy/30 bg-white px-3.5 py-3 pr-7 text-sm font-semibold text-teremun-dark hover:bg-[#ead7d5] transition-colors"
              style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 50%, 100% 100%, 0 100%)' }}
            >
              <FileText size={17} className="text-teremun-burgundy" />
              PDF
            </a>
            <a
              href={canvaDownloadPrintableUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2.5 border border-teremun-burgundy/30 bg-white px-3.5 py-3 pr-7 text-sm font-semibold text-teremun-dark hover:bg-[#ead7d5] transition-colors"
              style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 50%, 100% 100%, 0 100%)' }}
            >
              <Printer size={17} className="text-teremun-burgundy" />
              Imprimible
            </a>
          </div>
        </div>

        <div className="mt-4 text-center">
          <a
            href={canvaUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-teremun-burgundy px-5 py-3 font-semibold text-white transition-colors hover:bg-teremun-dark"
          >
            Abrir Handbook en Canva
          </a>
        </div>
      </div>
    </section>
  );
};

export default MaterialApoyo;