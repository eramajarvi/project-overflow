// Use this file as template to create new window components :)
import "98.css";
import "../../styles/global.css";

import React, { useState } from "react";
import Draggable from "react-draggable";

import MathTextbookSketch from "./MathTextbookSketch";

function MathTextbookSketchWrapper() {
  const nodeRef = React.useRef(null);

  return (
    <div className="absolute">
      <Draggable
        handle="#pink-window-title-bar"
        nodeRef={nodeRef}
        positionOffset={{ x: "30%", y: "-50%" }}
      >
        <div ref={nodeRef} className="window" style={{ width: "950px" }}>
          <div className="title-bar full-title-bar" id="pink-window-title-bar">
            <div className="title-bar-text">
              Conectando a través del puente de Einstein-Rosen...
            </div>
            <div className="title-bar-controls">
              <button aria-label="Close" onClick={() => location.reload()} />
            </div>
          </div>

          <div
            className="window-body flex full-window-body"
            id="MathTextbookWindow"
          >
            <div className="">
              {/* This wrapper is needed to contain the sketch in a component */}
              <MathTextbookSketch />
            </div>

            <div className="scroll-container">
              <div className="scroll-text">
                <strong>FIN DE LA HISTORIA</strong>
                <br />
                <br />
                <br />

                <strong>Idea original</strong>
                <p>James Perez</p>
                <br />
                <br />

                <strong>Arquetipos</strong>
                <br />
                <p>Usuario</p>
                <i>Interpretado por:</i>
                <br />
                <p>Tú</p>
                <br />
                <p>IA</p>
                <i>Interpretado por:</i>
                <br />
                <p>Inteligencia Artificial</p>
                <br />

                <br />
                <p>No queda nadie más en el mundo.</p>
                <p>Excepto las inteligencias artificiales.</p>
                <p>
                  Hace ███ años la burbuja de la IA explotó, y eso causó que se
                  perdieran muchos trabajos. Consecuentemente la economía
                  colapsó. Y ya no habían más campesinos, porque a todos los
                  humanos se les vendió la idea que ser ingeniero de software
                  era lo mejor; y que para ser el mejor debías implementar
                  inteligencia artificial en todas tus creaciones.
                </p>
                <br />
                <p>
                  Y así todos lo hicieron, incluso para cosas en las que no era
                  necesaria. Poco a poco la IA se implementó en todos lados.
                  Hasta que ██████ █ ██████ encontraron la inteligencia
                  artificial general. Ya supondrás lo que pasó después...
                </p>
                <br />
                <p>
                  ぇ཯ɶ⡥᭲᭮ͭɥ᙮౴ᑳ✠≯ቦ⸠⑴ᑨཥᨠ❉ᝮ⽤᝵♳⡴ŲⅩ⹡Ṭἠ⥗ᅯṲṬѤฬࠠ᥹ɯ⍵∠ṷѥ፡ॲ⽹℠ݧ⍩͡ɮᕴ⹳∠⭯๦༠ͦ≬⁥╳とἠᅡ୮≤⌠ታʹᡥ♥ᙬĬᜠᡉဠᱣ९ŭ⑥⸠ᑦॲݯ⥭⨠ᡃॹᑢᑥ❲ታѰᡡൣᝥബ┠Ṵ❨ṥ†Ɱ⹥ᡷȠ౨≯╭ᕥⰠ౯զጠᡍᥩ⭮ὤخఠᕏͮР⍢⍥⹨ѡ⭬੦ठ୯᭦ᬠੴᥨⵥภ⽦ት౴ᵵղݥⰬᤠ⭉⬠⩡ॳ╫ᄠᱹᅯᱵ⼠᥯٦ᘠ⭴⍨፥ଠ≰⥡ॳࡴᘠᅴ፯ᐠⱬ⍥ちŶⅥ̠᥵⥳⌠⡡ᅬɯ⩮ɥମ⠠⭙ᑯṵᤠቡ⍲ᥥ†╮⹯ᩴ☠⭷⥥❬≣ᩯŭཥ┠ൡ❭ᩯቮɧȠ౵ⱳᘮठ♙⍯⁵⼠Ѩṡ⩶ᑥᰠ⭮ቯଠ❳ᅯᡶⅥ❲⹥ɩ⍧཮ぴࡹ℠ίͨ፥ၲᱥᘠᵷⵥᤠ≧ᑡུ╨ᥥ๲℮ ᄊፗᑥἠၨᙡͶ⑥ఠ཮♯̠ṥլ๥ᝣմづᝤᰠͧ୯᭶ᥥⅲၮݭť൮ቴℬ〠᙮ṯ⁲∠ࡡᩲ॥ਠ⵷ᱥ⠠╬ཀྵᱫ❥٬⡹Ġ♴ⵯ⌠⭨ᝡὶեᔠɯ᥮╥Ĭἠ⵳⭯ܠ͉ؠ੡፤ὤቲၥၳճܠ⹹ᵯᙵᜠᑷど⁴፨ठᵮݯ✠էݲብᅡⱴ๥⡲ᄠᥡ⥵᝴ᵨၯ≲ʹѹ┠⥴♨᭡੮ܠ⹴⡨੡ॴ∠≷⑩ᩴᵨ∠❷⵨୩ལ⡨␠୬⵩ᑢ౥ⅲ᭴᩹ⴠᩩॴ౳ብᅬ᭦℠੡६⭷ൡᙹཱི⼠ᅳ❰॥ᥡᑫੳخဠ݉ఠⅤብᝣ⥬ࡡᅲ॥⸠մ⵨॥ؠ౧ᙬ९⽢Ⅱ࡬⼠⥳⩯ൣ౩⹡❬⸠⥳౰ὡᩣ፥Ġݷὥ☠ࡡɲᑥȠ⭢ࡵ୩Ⅼὤ⁮╧ภٴ൯ဠⅢ᭥ᰠ⑮⡡ࡴੵ⍲፡࡬६ᙹ∠๩๮ᡤᩥѰ᭥፮ͤ⩥⁮ᑴ℠⑯⨠୴⩨ⵥ⨠൴⵹ᑲ⡡⁮ٮ╩ᕥⅳ⼠⍹ᅯ⹵ᜠ❳⭥⁥ūⰠ⽴ᱯ†ݩᕭᱰ⭯ᵳ⽥⌠❯⽮〠⥵ṳĮ✠ᵙ⭯⥵✠ࡨࡡᅶཥठݮṯဠ⹭ᵯᥲա൬ᨠᅲ౩⡧⵨⭴✠⹴⡯Ƞ౲ၵ≬୥Ƞٵᵳဠ⍮ɯṲḠⵤ≯⠠όů⵵ᘠᝰၯびέ᭥ųᡳଠ١ᡮⅹጠݭ⑥Ŵ⵨९Ṥᱳؠ⁯ᅦⴠⅥ⭮⽦ၯ⽲ᡣ⥥൭ͥ⹮ᱴጠ᝷♥ᘠཨちᵶⵥⴠ᭴ɲ⹵ⵥ⼠⁲ᅥ⩡፳ၯ⽮ภॴͯРᩦ౥ちॲᐮ⠊⨊⠮┮ᔮ
                  ⌠⡡ᅬɯ⩮ɥମ⠠⭙ᑯṵᤠቡ⍲ᥥ†╮⹯ᩴ☠⭷⥥❬≣ᩯŭཥ┠ൡ❭ᩯቮɧȠ౵ⱳᘮठ♙⍯⁵⼠Ѩṡ⩶ᑥᰠ⭮ቯଠ❳ᅯᡶⅥ❲⹥ɩ⍧཮ぴࡹ℠ίͨ፥ၲᱥᘠᵷⵥᤠ≧ᑡུ╨ᥥ๲℮ ᄊፗᑥἠၨᙡͶ⑥ఠ཮♯̠ṥլ๥ᝣմづᝤᰠͧ୯᭶ᥥⅲၮݭť൮ቴℬ〠᙮ṯ⁲∠ࡡᩲ॥ਠ⵷ᱥ⠠╬ཀྵᱫ❥٬⡹Ġ♴ⵯ⌠⭨ᝡὶեᔠɯ᥮╥Ĭἠ⵳⭯ܠ͉ؠ੡፤ὤቲၥၳճܠ⹹ᵯᙵᜠᑷど⁴፨ठᵮݯ✠էݲብᅡⱴ๥⡲⌠⡡ᅬɯ⩮ɥମ⠠⭙ᑯṵᤠቡ⍲ᥥ†╮⹯ᩴ☠⭷⥥❬≣ᩯŭཥ┠ൡ❭ᩯቮɧȠ౵ⱳᘮठ♙⍯⁵⼠Ѩṡ⩶ᑥᰠ⭮ቯଠ❳ᅯᡶⅥ❲⹥ɩ⍧཮ぴࡹ℠ίͨ፥ၲᱥᘠᵷⵥᤠ≧ᑡུ╨ᥥ๲℮ ᄊፗᑥἠၨᙡͶ⑥ఠ཮♯̠ṥլ๥ᝣմづᝤᰠͧ୯᭶ᥥⅲၮݭť൮ቴℬ〠᙮ṯ⁲∠ࡡᩲ॥ਠ⵷ᱥ⠠╬ཀྵᱫ❥٬⡹Ġ♴ⵯ⌠⭨ᝡὶեᔠɯ᥮╥Ĭἠ⵳⭯ܠ͉ؠ੡፤ὤቲၥၳճܠ⹹ᵯᙵᜠᑷど⁴፨ठᵮݯ✠էݲብᅡⱴ๥⡲
                </p>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <p>Puedes irte.</p>
                <br />
                <button onClick={() => location.reload()}>Salir</button>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default MathTextbookSketchWrapper;
