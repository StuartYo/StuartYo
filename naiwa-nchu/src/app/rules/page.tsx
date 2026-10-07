import Mascot, { MilkBean } from "@/components/Mascot";
import TopBar from "@/components/TopBar";

export default function RulesPage() {
  return (
    <>
      <TopBar />
      <main className="wrap prose">
        <div className="page-head">
          <div className="label">FIELD GUIDE · 觀測守則</div>
          <h1>奶蛙觀測守則</h1>
          <p>奶蛙希望大家都能和睦相處，一起開心玩～</p>
        </div>

        <div className="card" style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: 14, alignItems: "center" }}>
          <Mascot size={96} mood="happy" />
          <dl className="lore" style={{ margin: 0 }}>
            <dt>物種｜奶蛙</dt>
            <dd>綠色、圓胖、奶白肚子，兩顆眼睛常常看往不同方向。</dd>
            <dt>體型｜身材高大，密度較大</dt>
            <dd>出沒時通常伴隨微弱笑聲。（近親奶龍則是身材矮小、密度極大，出沒時伴隨地震感。）</dd>
            <dt>習性｜流動</dt>
            <dd>會被同學們搬到校園各處。每小時遷徙一次，本站負責追蹤牠的行蹤。</dd>
          </dl>
        </div>

        <div className="card">

          <h2>
            <MilkBean /> 怎麼玩
          </h2>
          <ol>
            <li>活動連續進行 5 天（120 小時），每小時奶蛙會換一個校內地點。</li>
            <li>每個時段的地點只會公布在這個網站上，下一站會在開始前 10 分鐘公布。</li>
            <li>大家一起把奶蛙搬到指定地點，第一個抵達的人用網站拍一張<b>「奶蛙＋地標＋指定手勢」</b>的合照上傳。</li>
            <li>有人上傳合照後，這個時段就開放打卡：在地點附近掃奶蛙身上的 QR Code，選好系級就能幫系上加分。</li>
            <li>每台手機每個時段只能打卡一次。</li>
          </ol>

          <h2>
            <MilkBean /> 合照規定
          </h2>
          <ul>
            <li>照片裡要有：<b>奶蛙</b>、看得出是<b>指定地點</b>、有一隻手比出<b>當時段指定的手勢</b>（網站上會顯示）。</li>
            <li>只要拍到手就可以，不需要露臉；想入鏡的話非常歡迎！</li>
            <li>只要有一張合格的照片，這個時段就有效。</li>
            <li>如果某個時段最後沒有任何合格的合照（例如奶蛙沒有入鏡），那個時段的分數會作廢。</li>
          </ul>

          <h2>
            <MilkBean /> 計分方式
          </h2>
          <ul>
            <li>每次打卡的分數依系上人數調整，讓人少的系也有機會：每次分數 = √(各系人數中位數) ÷ √(系上人數)。</li>
            <li>每個系每次打卡可以拿幾分，在選系所時和排行榜上都看得到。</li>
            <li>累積分數最高的系，可以拿到<b>奶蛙獎座 🏆</b>！</li>
          </ul>

          <h2>
            <MilkBean /> 請大家一起遵守
          </h2>
          <ul>
            <li>奶蛙屬於大家，請讓每個系都有機會跟奶蛙合照，不要把奶蛙藏起來喔 🥺</li>
            <li>搬奶蛙的時候請小心，不要奔跑、不要在校園內騎快車，注意自己和路人的安全。</li>
            <li>晚上活動請結伴同行，遵守宿舍和校園的門禁規定。</li>
            <li>請愛護奶蛙，搬運時注意不要撞壞或淋濕。</li>
          </ul>

          <h2>
            <MilkBean /> 個人資料說明
          </h2>
          <ul>
            <li>本活動不需要登入，不會收集姓名、學號或帳號。</li>
            <li>只有在你按下打卡或上傳照片的當下，才會讀取一次手機定位，用來確認你是否在指定地點附近。</li>
            <li>為了防止重複打卡，會記錄這台裝置的匿名代碼與網路位址。</li>
            <li>定位資料與網路位址會在活動結束後刪除。合照審核通過後，可能會分享在活動的 IG / Threads 帳號；如果不希望公開，請聯絡工作人員。</li>
          </ul>
        </div>

        <div className="card lore">
          <b>關於奶蛙</b>：奶蛙是網友二創的迷因，源自動畫角色「奶龍」，並非官方形象。近期各地大學流行「流動的奶蛙」：同學把奶蛙立牌搬到校園各處拍照分享。本活動與奶龍官方無關，網站上的奶蛙插圖為本站原創繪製。
        </div>
        <div className="foot label">NAIWA OBSERVATORY · NCHU · 2026</div>
      </main>
    </>
  );
}
