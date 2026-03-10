const languages = {
  spanish: {
    key: "spanish",
    flag: "🇪🇸",
    nativeLabel: "Español",
    nativeShort: "Español",
    englishName: "Spanish",
    audioPrefix: "spanish",
    sortOrder: 1
  },

  mandarin: {
    key: "mandarin",
    flag: "🇨🇳🇹🇼",
    nativeLabel: "普通话 / 國語",
    nativeShort: "中文",
    englishName: "Mandarin",
    audioPrefix: "mandarin",
    sortOrder: 2
  },

  cantonese: {
    key: "cantonese",
    flag: "🇭🇰🇲🇴",
    nativeLabel: "广东话 / 粵語",
    nativeShort: "广东话",
    englishName: "Cantonese",
    audioPrefix: "cantonese",
    sortOrder: 3
  },

  toishanese: {
    key: "toishanese",
    flag: "🇨🇳",
    nativeLabel: "台山话",
    nativeShort: "台山话",
    englishName: "Toishanese",
    audioPrefix: "toishanese",
    sortOrder: 4
  },

  korean: {
    key: "korean",
    flag: "🇰🇷",
    nativeLabel: "한국어",
    nativeShort: "한국어",
    englishName: "Korean",
    audioPrefix: "korean",
    sortOrder: 5
  },

  russian: {
    key: "russian",
    flag: "🇷🇺",
    nativeLabel: "Русский",
    nativeShort: "Русский",
    englishName: "Russian",
    audioPrefix: "russian",
    sortOrder: 6
  }
};

const nativePhrases = {
  mandarin: {
    emergency: "紧急情况",
    police: "警察",
    ambulance: "救护车",
    fire: "火警",
    call911: "请帮我打 911",
    language: "语言",
    ispeak: "我说中文",
    interpreter: "需要翻译",
    noEnglish: "我不会英语"
  },

  cantonese: {
    emergency: "紧急情况",
    police: "警察",
    ambulance: "救护车",
    fire: "火警",
    call911: "请帮我打 911",
    language: "语言",
    ispeak: "我说广东话",
    interpreter: "需要翻译",
    noEnglish: "我不会英语"
  },

  toishanese: {
    emergency: "紧急情况",
    police: "警察",
    ambulance: "救护车",
    fire: "火警",
    call911: "请帮我打 911",
    language: "语言",
    ispeak: "我说台山话",
    interpreter: "需要翻译",
    noEnglish: "我不会英语"
  },

  spanish: {
    emergency: "Emergencia",
    police: "Policía",
    ambulance: "Ambulancia",
    fire: "Incendio",
    call911: "Llame al 911 por mí",
    language: "Idioma",
    ispeak: "Hablo español",
    interpreter: "Necesito intérprete",
    noEnglish: "No entiendo inglés"
  },

  korean: {
    emergency: "긴급 상황",
    police: "경찰",
    ambulance: "구급차",
    fire: "화재",
    call911: "911에 전화해 주세요",
    language: "언어",
    ispeak: "저는 한국어를 합니다",
    interpreter: "통역이 필요합니다",
    noEnglish: "저는 영어를 못합니다"
  },

  russian: {
    emergency: "Срочно",
    police: "Полиция",
    ambulance: "Скорая",
    fire: "Пожар",
    call911: "Позвоните в 911",
    language: "Язык",
    ispeak: "Я говорю по-русски",
    interpreter: "Мне нужен переводчик",
    noEnglish: "Я не понимаю английский"
  }
};

const englishLabels = {
  emergency: "Emergency",
  police: "Police",
  ambulance: "Ambulance",
  fire: "Fire",
  call911: "Call 911 for me",
  language: "Language"
};

document.addEventListener("DOMContentLoaded", () => {
  renderLanguageList();
  loadMenuLanguage();
  renderMenuLabels();
  loadCardIfNeeded();
});

function renderLanguageList() {
  const container = document.getElementById("languageList");
  if (!container) return;

  const orderedLanguages = Object.values(languages).sort((a, b) => a.sortOrder - b.sortOrder);
  container.innerHTML = "";

  orderedLanguages.forEach(language => {
    const row = document.createElement("div");
    row.className = "language-row";

    const langButton = document.createElement("button");
    langButton.className = "lang-btn";
    langButton.textContent = `${language.flag} ${language.nativeLabel}`;
    langButton.onclick = () => selectLanguage(language.key);

    const audioButton = document.createElement("button");
    audioButton.className = "audio-btn";
    audioButton.textContent = "🔊";
    audioButton.onclick = () => playLanguageName(language.key);

    row.appendChild(langButton);
    row.appendChild(audioButton);
    container.appendChild(row);
  });
}

function selectLanguage(languageKey) {
  const language = languages[languageKey];
  localStorage.setItem("selectedLanguageKey", language.key);
  localStorage.setItem("languageEnglish", language.englishName);
  localStorage.setItem("languageNative", language.nativeShort);
  localStorage.setItem("audioPrefix", language.audioPrefix);
  window.location.href = "menu.html";
}

function playLanguageName(languageKey) {
  const language = languages[languageKey];
  const audio = new Audio(`audio/${language.audioPrefix}_name.aiff`);
  audio.play().catch(() => {
    console.log("Audio playback blocked until user interacts.");
  });
}

function goToOtherLanguage() {
  window.location.href = "https://translate.google.com/?sl=auto&tl=en&op=conversation";
}

function goBackToLanguage() {
  localStorage.removeItem("selectedLanguageKey");
  localStorage.removeItem("languageEnglish");
  localStorage.removeItem("languageNative");
  localStorage.removeItem("audioPrefix");
  window.location.href = "index.html";
}

function openCard(type) {
  localStorage.setItem("cardType", type);
  window.location.href = "card.html";
}

function loadMenuLanguage() {
  const currentLanguageElement = document.querySelector(".current-language");
  if (!currentLanguageElement) return;

  const languageKey = localStorage.getItem("selectedLanguageKey") || "mandarin";
  const language = languages[languageKey];
  currentLanguageElement.textContent = `${language.flag} ${language.nativeLabel}`;
}

function renderMenuLabels() {
  const languageKey = localStorage.getItem("selectedLanguageKey");
  if (!languageKey) return;

  const phrases = nativePhrases[languageKey];
  if (!phrases) return;

  setLabel("emergency", phrases.emergency, englishLabels.emergency);
  setLabel("police", phrases.police, englishLabels.police);
  setLabel("ambulance", phrases.ambulance, englishLabels.ambulance);
  setLabel("fire", phrases.fire, englishLabels.fire);
  setLabel("call911", phrases.call911, englishLabels.call911);
  setLabel("language", phrases.language, englishLabels.language);
}

function setLabel(key, nativeText, englishText) {
  const nativeEl = document.getElementById(`label-${key}-native`);
  const englishEl = document.getElementById(`label-${key}-english`);

  if (nativeEl) nativeEl.textContent = nativeText;
  if (englishEl) englishEl.textContent = englishText;
}

function loadCardIfNeeded() {
  const cardNative = document.getElementById("cardNative");
  const cardEnglishTitle = document.getElementById("cardEnglishTitle");
  const cardEnglishBody = document.getElementById("cardEnglishBody");

  if (!cardNative || !cardEnglishTitle || !cardEnglishBody) return;
  loadCard();
}

function loadCard() {
  const languageKey = localStorage.getItem("selectedLanguageKey") || "mandarin";
  const cardType = localStorage.getItem("cardType") || "police";

  const language = languages[languageKey];
  const phrases = nativePhrases[languageKey];

  const nativeTextMap = {
    emergency: `${phrases.emergency}\n${phrases.ispeak}\n${phrases.interpreter}`,
    police: `${phrases.needPolice || phrases.police}\n${phrases.ispeak}\n${phrases.interpreter}`,
    ambulance: `${phrases.needAmbulance || phrases.ambulance}\n${phrases.ispeak}\n${phrases.interpreter}`,
    fire: `${phrases.needFire || phrases.fire}\n${phrases.ispeak}\n${phrases.interpreter}`,
    call911: `${phrases.call911}\n${phrases.ispeak}\n${phrases.noEnglish}`,
    language: `${phrases.ispeak}\n${phrases.interpreter}`
  };

  const englishTitleMap = {
    emergency: "THIS IS AN EMERGENCY",
    police: "I NEED THE POLICE",
    ambulance: "I NEED AN AMBULANCE",
    fire: "FIRE EMERGENCY",
    call911: "PLEASE CALL 911 FOR ME",
    language: `I SPEAK ${language.englishName}`
  };

  const englishBodyMap = {
    emergency: `I SPEAK ${language.englishName}\nI NEED AN INTERPRETER`,
    police: `I SPEAK ${language.englishName}\nI NEED AN INTERPRETER`,
    ambulance: `I SPEAK ${language.englishName}\nI NEED AN INTERPRETER`,
    fire: `I SPEAK ${language.englishName}\nI NEED AN INTERPRETER`,
    call911: `I SPEAK ${language.englishName}\nI DO NOT UNDERSTAND ENGLISH`,
    language: `I NEED AN INTERPRETER`
  };

  document.getElementById("cardNative").innerHTML = nativeTextMap[cardType].replace(/\n/g, "<br>");
  document.getElementById("cardEnglishTitle").innerHTML = englishTitleMap[cardType];
  document.getElementById("cardEnglishBody").innerHTML = englishBodyMap[cardType].replace(/\n/g, "<br>");


  const audio = document.getElementById("cardAudio");
  audio.src = `audio/${language.audioPrefix}_${cardType}.m4a`;
  audio.load();
}

function playCurrentAudio() {
  const audio = document.getElementById("cardAudio");
  if (!audio) return;

  audio.currentTime = 0;
  audio.play().catch(err => {
    console.log("Audio play failed:", err);
  });
}
