import { useState } from "react";

// ══════════ 사용 안내 팝업 (PART 7-8) ══════════
const FirstVisitModal = ({ open, onClose, title, steps }) => {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(14, 39, 80, 0.4)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: 14, padding: 32, maxWidth: 480, width: '100%', boxShadow: '0 20px 50px rgba(14, 39, 80,0.2)' }} onClick={e => e.stopPropagation()}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0E2750', margin: 0, marginBottom: 16 }}>{title}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, fontSize: 16, color: '#0E2750', lineHeight: 1.7 }}>
              <span style={{ color: '#C9A86A', fontWeight: 700, minWidth: 20 }}>{i+1}.</span>
              <span dangerouslySetInnerHTML={{ __html: s }} />
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{ background: '#0E2750', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 16, fontWeight: 600, cursor: 'pointer', width: '100%' }}>
          확인, 시작합니다
        </button>
      </div>
    </div>
  );
};

// ══════════ 하단 고정 저작권 + 문의 (PART 7-8, 11) ══════════
const StickyFooter = () => (
  <div style={{ position: 'sticky', bottom: 0, background: '#fff', borderTop: '1px solid #6E7A8F33', padding: '10px 16px', marginTop: 24, zIndex: 5 }}>
    <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <p style={{ fontSize: 16, color: '#6E7A8F', margin: 0 }}>© 2026 CareerEngineer. All Rights Reserved.</p>
      <p style={{ fontSize: 16, color: '#6E7A8F', margin: 0 }}>
        <a href="https://open.kakao.com/me/careerengineer" target="_blank" rel="noopener noreferrer" style={{ color: '#C9A86A', textDecoration: 'none' }}>CareerEngineer 카카오톡 상담</a>
      </p>
    </div>
  </div>
);


const QS = [
  { id:"who", q:"당신은 어떤 상황인가요?", opts:[
    {v:"new",l:"첫 취업 준비 중",d:"대학생 또는 졸업생"},
    {v:"career",l:"이직 준비 중 (같은 직무)",d:"경력직, 회사만 옮기려는"},
    {v:"switch",l:"직무를 바꾸려고 해요",d:"취준생 또는 경력직, 다른 직무로"},
    {v:"grad",l:"대학원 졸업 후 기업 취업",d:"석사/박사"},
  ]},
  { id:"job", q:"지원할 직무가 정해졌나요?", opts:[
    {v:0,l:"아직 안 정함",d:"뭘 해야 할지 모르겠어요"},
    {v:1,l:"대략 정함",d:"1~2개 후보가 있어요"},
    {v:2,l:"확실히 정함",d:"직무를 명확하게 말할 수 있어요"},
  ]},
  { id:"jd", q:"지원 직무의 채용공고를 분석해봤나요?", opts:[
    {v:0,l:"아직 안 읽어봄",d:"공고를 본 적이 없거나 대충 훑어봄"},
    {v:1,l:"몇 개 읽어봄",d:"1~5개 정도 읽어봤어요"},
    {v:2,l:"10개 이상 읽고 키워드 정리함",d:"자격요건/우대사항을 뽑아서 정리함"},
  ]},
  { id:"exp", q:"내 경험을 정리해봤나요?", opts:[
    {v:0,l:"안 해봄",d:"어디서부터 정리해야 할지 모르겠어요"},
    {v:1,l:"머릿속으로만 생각해봄",d:"문서로 쓰진 않았어요"},
    {v:2,l:"문서로 정리하고 직무와 연결함",d:"경험 목록이 있고 JD와 매칭함"},
  ]},
  { id:"essay", q:"자소서를 써봤나요?", opts:[
    {v:0,l:"아직 안 써봄",d:"시작을 못 했어요"},
    {v:1,l:"쓰고 있는 중",d:"초안이 있거나 작성 중이에요"},
    {v:2,l:"제출했는데 계속 탈락",d:"여러 번 냈지만 서류에서 떨어져요"},
    {v:3,l:"서류는 통과한 적 있음",d:"면접까지 간 경험이 있어요"},
  ]},
  { id:"resume", q:"이력서가 준비되어 있나요?", opts:[
    {v:0,l:"없음",d:"이력서를 아직 안 만들었어요"},
    {v:1,l:"있지만 범용",d:"지원 직무에 맞게 고치진 않았어요"},
    {v:2,l:"직무에 맞게 커스터마이즈함",d:"JD에 맞춰서 정리했어요"},
  ]},
  { id:"interview", q:"면접 준비는 어느 정도 했나요?", opts:[
    {v:0,l:"아직 안 해봄",d:"면접 준비를 시작하지 않았어요"},
    {v:1,l:"예상 질문은 생각해봄",d:"답변을 정리하진 않았어요"},
    {v:2,l:"답변 정리하고 소리 내어 연습함",d:"20개 이상 질문에 답변 준비함"},
  ]},
];

function analyze(ans) {
  const who = ans.who;
  const levels = { job: ans.job, jd: ans.jd, exp: ans.exp, essay: ans.essay, resume: ans.resume, interview: ans.interview };
  
  // Find weakest stage
  const stageMap = [
    { key:"job", step:0, name:"방향 설정" },
    { key:"jd", step:1, name:"채용공고 분석" },
    { key:"exp", step:2, name:"경험 정리" },
    { key:"essay", step:3, name:"자소서 작성" },
    { key:"resume", step:4, name:"이력서 작성" },
    { key:"interview", step:5, name:"면접 준비" },
  ];

  let weakest = null;
  // 순서대로 첫 번째 미완료 단계를 찾음
  // 완료 기준: job/jd/exp/resume/interview는 2이상, essay는 3(합격경험)
  for (const s of stageMap) {
    const lv = levels[s.key];
    const isComplete = (s.key === "essay") ? (lv >= 3) : (lv >= 2);
    if (!isComplete) { weakest = s; break; }
  }
  if (!weakest) weakest = stageMap[5];

  // Build immediate actions — weakest 단계 액션을 먼저, 그다음 보조 액션
  const primary = [];  // weakest 단계 액션
  const secondary = [];  // 다른 단계 보조 액션
  const docs = [];

  const addAction = (stage, obj) => { if (stage === weakest.step) primary.push(obj); else secondary.push(obj); };

  // STEP 0: 방향 설정
  if (levels.job === 0) {
    addAction(0, { text: "지원할 직무 후보 5개를 뽑으세요", detail: who === "new" ? "전공 기반 + 관심 기반 + 강점 기반으로 나눠서 생각해보세요. 잡코리아/사람인에서 다양한 직무의 채용공고를 훑어보는 것도 도움됩니다." : who === "switch" ? "'왜 바꾸려 하는가'를 먼저 정리하세요. 기존 경험에서 전이 가능한 역량이 있는 직무를 찾아보세요." : who === "grad" ? "연구직(R&D), 기업 일반직, 공공기관 중 방향을 먼저 정하세요." : "현 직무와 같은 직무인지, 다른 직무로 가고 싶은지 먼저 결정하세요." });
    addAction(0, { text: "현직자 콘텐츠 3개 이상 찾아보세요", detail: "유튜브 '○○직무 현실', 블로그 현직자 후기, 블라인드 직무 게시판을 활용하세요. 실제로 하는 일이 내 생각과 맞는지 확인하는 과정입니다." });
    docs.push({ n: "채용공고 및 직무 분석", u: "https://www.latpeed.com/products/-3Wgm" });
    if (who === "career" || who === "switch") docs.push({ n: "CareerEngineer 1-Hour 1:1 취업컨설팅", u: "https://www.latpeed.com/products/S92cP" });
  } else if (levels.job === 1) {
    addAction(0, { text: "후보 직무의 채용공고를 각각 5개씩 읽어보세요", detail: "실제 업무 내용, 자격요건, 우대사항을 비교하면 어떤 직무가 나와 맞는지 감이 옵니다. 공고를 읽으면서 '이건 할 수 있겠다/재밌겠다'는 느낌이 오는 쪽으로 좁히세요." });
    addAction(0, { text: "후보를 1~2개로 좁혀서 확정하세요", detail: "'나는 OO 직무에 지원할 것이다'를 한 문장으로 말할 수 있으면 됩니다." });
  }

  // STEP 1: 채용공고 분석
  if (levels.job >= 1 && levels.jd === 0) {
    addAction(1, { text: "지원 직무 채용공고 10개를 모으세요", detail: "잡코리아, 사람인, 원티드, 기업 채용페이지에서 같은 직무 공고를 10개 이상 수집하세요. 엑셀이나 노션에 자격요건/우대사항/주요업무 키워드를 정리합니다." });
    addAction(1, { text: "반복되는 키워드 3~5개를 뽑으세요", detail: "10개 공고에서 계속 나오는 단어가 이 직무의 '핵심 역량'입니다. 이 키워드가 자소서와 이력서의 뼈대가 됩니다." });
    docs.push({ n: "채용공고 및 직무 분석", u: "https://www.latpeed.com/products/-3Wgm" });
    docs.push({ n: "채용공고 및 직무 분석", u: "https://www.latpeed.com/products/-3Wgm" });
  } else if (levels.jd === 1) {
    addAction(1, { text: "채용공고를 10개까지 채우고 키워드를 정리하세요", detail: "1~5개로는 패턴이 안 보입니다. 10개 이상 보면 '이 직무가 진짜 원하는 것'이 명확해집니다. 특히 우대사항을 놓치지 마세요." });
    if (who === "switch") addAction(1, { text: "내 기존 경험에서 전이 가능한 역량을 표시하세요", detail: "새 직무의 자격요건 옆에 내가 가진 것/없는 것을 나누고, 기존 경력이 오히려 강점이 되는 포인트를 찾으세요." });
    docs.push({ n: "채용공고 및 직무 분석", u: "https://www.latpeed.com/products/-3Wgm" });
  }

  // STEP 2: 경험 정리
  if (levels.jd >= 1 && levels.exp === 0) {
    addAction(2, { text: who === "career" ? "경력 성과를 STAR-I 구조로 5개 이상 정리하세요" : who === "grad" ? "연구 경험을 프로젝트별로 정리하세요 (주제/역할/방법론/결과)" : "대학 생활의 모든 경험을 카테고리별로 나열하세요", detail: who === "career" ? "회사별로 담당 업무, 프로젝트, 성과를 나열하고, 각각 상황-과제-행동-결과-임팩트로 정리합니다. '팀 성과'가 아닌 '나의 기여'로 분리하는 게 핵심입니다." : who === "grad" ? "논문/학회/실험/연구실 협업을 카테고리로 나누세요. '논문을 썼다'가 아니라 '이 문제를 이 방법으로 해결했다'로 기업 언어 변환이 필요합니다." : "수업, 프로젝트, 동아리, 아르바이트, 대외활동, 봉사, 자격증, 공모전... 대단하지 않아도 됩니다. 지금은 판단하지 말고 양을 모으세요. 최소 15개를 목표로." });
    docs.push({ n: "경험 정리", u: "https://www.latpeed.com/products/wDSaj" });
  } else if (levels.exp === 1) {
    addAction(2, { text: "머릿속 경험을 문서로 꺼내세요", detail: "생각만 하면 빠지는 것이 많습니다. 카테고리별로 적어보면 잊고 있던 경험이 나옵니다. 각 경험에 #동기 #역량 #성과 #성격 #성장 태그를 붙이면 자소서 배치가 쉬워집니다." });
    docs.push({ n: "경험 정리", u: "https://www.latpeed.com/products/wDSaj" });
    docs.push({ n: "자소서 작성", u: "https://www.latpeed.com/products/dfdMW" });
  }

  // STEP 3: 자소서
  if (levels.exp >= 1 && levels.essay === 0) {
    addAction(3, { text: "자소서 5대 항목 중 지원동기부터 초안을 쓰세요", detail: "'왜 이 직무인가' \u2192 '왜 이 회사인가' \u2192 '무엇을 준비했는가' \u2192 '어떻게 기여할 것인가' 순서로 씁니다. 완벽하지 않아도 됩니다. 초안을 쓰고 수정하는 반복이 핵심입니다." });
    if (who === "switch") addAction(3, { text: "지원동기에 '왜 전환하는가'를 반드시 넣으세요", detail: "기존 직무에서 관심이 생긴 계기 \u2192 확신이 커진 과정 \u2192 기존 경험의 강점 연결 \u2192 이 회사인 이유. '싫어서 도망'이 아닌 '끌려서 선택'으로 써야 합니다." });
    docs.push({ n: "지원동기 작성", u: "https://www.latpeed.com/products/dfdMW" });
    docs.push({ n: "자소서 작성", u: "https://www.latpeed.com/products/dfdMW" });
    docs.push({ n: "자소서 멘토링", u: "https://www.latpeed.com/products/fKnUV" });
  } else if (levels.essay === 1) {
    addAction(3, { text: "나머지 항목 초안을 완성하고 완성기준으로 셀프 점검하세요", detail: "지원동기 \u2192 직무확보역량 \u2192 성격장단점 \u2192 목표수립 \u2192 입사후포부 순서. 같은 경험을 2개 항목에 넣지 마세요. 완성기준 체크리스트로 80% 이상 통과해야 합니다." });
    docs.push({ n: "자소서 작성", u: "https://www.latpeed.com/products/dfdMW" });
    docs.push({ n: "자소서 멘토링", u: "https://www.latpeed.com/products/fKnUV" });
  } else if (levels.essay === 2) {
    addAction(3, { text: "탈락 원인을 진단하세요", detail: "아래 항목을 확인해보세요:\n- JD 키워드가 자소서에 들어가 있는가?\n- '열심히', '최선을' 같은 추상적 표현이 있는가?\n- 경험에 수치/결과가 있는가?\n- 다른 회사에 넣어도 바꿀 곳이 없는 자소서인가?\n하나라도 해당되면 그것이 탈락 원인입니다." });
    addAction(3, { text: "채용공고 분석부터 다시 하세요", detail: "서류 탈락이 반복되면 자소서 문장력이 아니라 방향 자체가 틀린 경우가 대부분입니다. STEP 1(채용공고 분석)로 돌아가서 키워드를 다시 뽑고, 그 키워드에 맞춰 자소서를 재구성하세요." });
    docs.push({ n: "채용공고 및 직무 분석", u: "https://www.latpeed.com/products/-3Wgm" });
    docs.push({ n: "자소서 작성", u: "https://www.latpeed.com/products/dfdMW" });
    docs.push({ n: "자소서 멘토링", u: "https://www.latpeed.com/products/fKnUV" });
  }

  // STEP 4: 이력서
  if (levels.essay >= 1 && levels.resume === 0) {
    addAction(4, { text: who === "career" ? "경력기술서를 포함한 이력서를 작성하세요" : who === "grad" ? "학술 CV를 기업 이력서로 변환하세요" : "이력서를 만들고 PDF로 변환하세요", detail: who === "career" ? "경력 요약 \u2192 경력사항(역순) \u2192 핵심성과 \u2192 스킬 \u2192 학력 순서. 최근 경력일수록 상세하게 씁니다." : who === "grad" ? "논문 목록은 핵심 1~2개만 남기고, 연구의 비즈니스 임팩트를 강조하세요. 학술 용어를 쉬운 말로 바꾸세요." : "인적사항 \u2192 한줄소개(JD 키워드 반영) \u2192 학력 \u2192 경험(성과 중심) \u2192 스킬 순서. 파일명은 '이름_직무_이력서.pdf'." });
    docs.push({ n: "이력서 작성", u: "https://www.latpeed.com/products/k6z-h" });
  } else if (levels.resume === 1) {
    addAction(4, { text: "이력서를 지원 직무에 맞게 커스터마이즈하세요", detail: "한줄소개에 JD 키워드를 반영하고, 경험을 해당 직무 관점으로 재기술하세요. 모든 회사에 같은 이력서를 보내면 안 됩니다." });
  }

  // STEP 5: 면접
  if (levels.essay >= 1 && levels.resume >= 1 && levels.interview === 0) {
    addAction(5, { text: "자기소개 1분 30초 스크립트부터 만드세요", detail: "모든 면접의 첫 질문입니다. 핵심 경험 + 핵심 역량 + 지원 직무 기여 방향을 1분 30초로 정리하세요." });
    addAction(5, { text: "자소서 기반 예상 질문 20개를 뽑으세요", detail: "자소서 각 항목에서 면접관이 물을 수 있는 질문을 뽑고, 각각 STAR(상황-과제-행동-결과) 구조로 답변을 정리하세요. 반드시 소리 내어 연습하세요." });
    if (who === "career") addAction(5, { text: "이직 고유 질문을 준비하세요", detail: "퇴사 사유(30초 이내, 긍정적으로), 연봉 기대치(업계 조사 기반 범위), 전 직장 성과(STAR-I 3개), 인수인계 기간을 미리 정리하세요." });
    if (who === "switch") addAction(5, { text: "'왜 전환하는가'를 1분 이내로 말하는 연습을 하세요", detail: "직무 전환 면접에서는 거의 모든 질문이 이것과 연결됩니다. 기존 경험의 강점 + 새 직무 준비 과정 + 기여 방향을 자연스럽게 연결하세요." });
    docs.push({ n: "신입 면접 준비", u: "https://www.latpeed.com/products/wUjfn" });
    docs.push({ n: "면접 멘토링", u: "https://www.latpeed.com/products/tZ5xw" });
    if (who === "career" || who === "switch") docs.push({ n: "경력 면접 준비", u: "https://www.latpeed.com/products/vJAeZ" });
  } else if (levels.interview === 1) {
    addAction(5, { text: "답변을 정리하고 소리 내어 연습하세요", detail: "머릿속으로 생각하는 것과 입으로 말하는 것은 완전히 다릅니다. 최소 3번, 가능하면 누군가에게 들려주면서 연습하세요. 키워드만 외우고 자연스럽게 말하는 것이 목표입니다." });
    docs.push({ n: "면접 멘토링", u: "https://www.latpeed.com/products/tZ5xw" });
  }

  // primary(weakest 단계) 먼저, 그다음 secondary
  const now = [...primary, ...secondary];

  // Trim to top 3 immediate actions
  const topNow = now.slice(0, 3);

  // Build big picture remaining
  const remaining = [];
  let hitTodo = false;
  for (const s of stageMap) {
    const lv = levels[s.key];
    const isComplete = (s.key === "essay") ? (lv >= 3) : (lv >= 2);
    let status = isComplete ? "done" : (lv === 0 || (s.key === "essay" && lv === 2)) ? "todo" : "partial";
    if (hitTodo && (status === "done" || status === "partial") && s.step > weakest.step) status = "recheck";
    if (status === "todo") hitTodo = true;
    remaining.push({ ...s, status, level: lv });
  }

  // 전부 완료 시 축하 액션
  if (now.length === 0) {
    now.push({ text: "축하합니다! 기본 준비가 모두 되어 있습니다", detail: "지원을 시작하세요. 회사별로 자소서/이력서를 커스터마이즈하고, 면접 전 해당 회사 리서치를 하면 됩니다. 지원 현황표를 만들어서 체계적으로 관리하세요." });
  }

  // Deduplicate docs
  const seen = new Set();
  const uniqueDocs = docs.filter(d => { if (seen.has(d.n)) return false; seen.add(d.n); return true; });

  return { who, weakest, now: topNow, remaining, docs: uniqueDocs };
}

const COLORS = { accent:"#0E2750", accent2:"#C9A86A", sub:"#6E7A8F", border:"#6E7A8F33", bg:"#ffffff", bgAlt:"#F2F1EC", white: "#ffffff", green: '#C9A86A', greenBg: '#FBFAF6', red: '#0E2750', redBg: '#F2F1EC', yellow: '#C9A86A', yellowBg: '#FBFAF6', blue: '#1B3A6B', blueBg: '#F2F1EC' };
const SPACING = { xs: 4, sm: 8, base: 12, md: 16, lg: 24, xl: 32, xxl: 48 };
const RADIUS = { sm: 6, base: 10, md: 14, lg: 20, pill: 999 };
const FONT = {
  family: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
  weight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  size: { xs: 16, sm: 16, base: 16, md: 16, bodyL: 20, lg: 20, xl: 20, h3: 24, h2: 32, h1: 48, display: 72 },
  lineHeight: { tight: 1.35, base: 1.6, relaxed: 1.7 },
};

  // ══════════ CE 로고 (정식 PNG base64 임베딩) ══════════
  const CE_SYMBOL_B64 = "data:image/png;base64,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";
  const CE_LOCKUP_B64 = "data:image/png;base64,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";
  const CESymbol = ({ size = 32 }) => (
    <img src={CE_SYMBOL_B64} alt="CareerEngineer 심볼" style={{ height: size, width: 'auto', flexShrink: 0, display: 'inline-block' }} />
  );
  const CELockupA = ({ height = 32 }) => (
    <img src={CE_LOCKUP_B64} alt="CareerEngineer" style={{ height: height, width: 'auto', flexShrink: 0, display: 'inline-block' }} />
  );


// ════════════════════════════════════════════════════════════════
//  CareerEngineer 워크북 라이브러리 (URL은 나중에 일괄 적용)
// ════════════════════════════════════════════════════════════════
const WORKBOOK_LINKS = { career_roadmap: { label: 'STEP 0 · 취업준비 진단', url: 'https://www.latpeed.com/products/nDbq9' },
  job_analysis:       { label: 'STEP 1 · 채용공고 및 직무 분석', url: 'https://www.latpeed.com/products/-3Wgm' },
  experience:         { label: 'STEP 2 · 경험 정리', url: 'https://www.latpeed.com/products/wDSaj' },
  motivation:         { label: 'STEP 4 · 지원동기 작성', url: 'https://www.latpeed.com/products/dfdMW' },
  jobcompetency:      { label: 'STEP 4 · 직무역량 작성', url: 'https://www.latpeed.com/products/dfdMW' },
  personality:        { label: 'STEP 4 · 성격 장단점 작성', url: 'https://www.latpeed.com/products/dfdMW' },
  goalachievement:    { label: 'STEP 4 · 목표수립 및 달성 작성', url: 'https://www.latpeed.com/products/dfdMW' },
  careergoal:         { label: 'STEP 4 · 입사후 포부 작성', url: 'https://www.latpeed.com/products/dfdMW' },
  self_introduction:  { label: 'STEP 5 · 1분 자기소개 준비', url: 'https://www.latpeed.com/products/LObbV' },
  resume:             { label: 'STEP 3 · 이력서 작성', url: 'https://www.latpeed.com/products/k6z-h' },
  career_description: { label: 'STEP 3 · 경력기술서 작성', url: 'https://www.latpeed.com/products/YmTqC' },
  interview_new:      { label: 'STEP 5 · 신입 면접 준비', url: 'https://www.latpeed.com/products/wUjfn' },
  interview_career:   { label: 'STEP 5 · 경력 면접 준비', url: 'https://www.latpeed.com/products/vJAeZ' },
};

const RelatedWorkbook = ({ id, hint }) => {
  const link = WORKBOOK_LINKS[id];
  if (!link) return null;
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer"
       style={{
         display: 'flex', alignItems: 'flex-start', gap: 8,
         padding: '10px 12px', background: '#F2F1EC',
         border: '1px solid #1B3A6B33', borderRadius: 6,
         textDecoration: 'none', color: '#0E2750',
       }}>
      <span style={{ fontSize: 16, color: '#1B3A6B', marginTop: 1 }}></span>
      <span style={{ fontSize: 16, lineHeight: 1.6, flex: 1 }}>
        <strong style={{ color: '#1B3A6B' }}>{link.label}</strong>
        {hint && <span style={{ color: '#0E2750' }}> · {hint}</span>}
      </span>
    </a>
  );
};
const RelatedWorkbookList = ({ items, title = '함께 보면 좋은 워크북' }) => (
  <div style={{
    background: '#ffffff', border: '1px solid #6E7A8F33',
    borderRadius: 10, padding: 16, marginTop: 12, marginBottom: 12,
  }}>
    <p style={{
      fontSize: 16, fontWeight: 600, color: '#0E2750',
      margin: 0, marginBottom: 10, letterSpacing: 0.3,
    }}>{title}</p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((item, i) => (
        <RelatedWorkbook key={i} id={item.id} hint={item.hint} />
      ))}
    </div>
  </div>
);
const Pill = ({children,color}) => <span style={{display:"inline-block",fontSize: 16,padding:"2px 10px",borderRadius:20,background:color+"18",color,fontWeight:500}}>{children}</span>;

export default function App() {
  const [showStepNav, setShowStepNav] = useState(false);
  const [page, setPage] = useState("welcome");
  const [showHelp, setShowHelp] = useState(true);
  const [qi, setQi] = useState(0);
  const [ans, setAns] = useState({});
  const [result, setResult] = useState(null);
  const [expandedAction, setExpandedAction] = useState(0);

  const css = { wrap:{fontFamily:"'Pretendard',-apple-system,BlinkMacSystemFont,'Segoe UI','Apple SD Gothic Neo','맑은 고딕','Malgun Gothic',sans-serif",maxWidth:900,margin:"0 auto",padding:"0 16px",color:COLORS.accent} };

  const selectOpt = (qid, val) => {
    const newAns = { ...ans, [qid]: val };
    setAns(newAns);
    if (qi < QS.length - 1) {
      setTimeout(() => setQi(qi + 1), 200);
    } else {
      const r = analyze(newAns);
      setResult(r);
      setPage("result");
    }
  };

  // STEP 네비게이터 드롭다운 (가이드 PART 7-6: 헤더 STEP 클릭 시)
  const StepNavigatorDropdown = ({ open, onClose, currentKey, anchorRef }) => {
    if (!open) return null;
    
    // 7단계 구조 - 자소서 5대 항목만 하위 항목 펼침, 나머지는 단일 링크
    const stepGroups = [
      { step: '0', label: '취업준비 진단', key: 'career_roadmap' },
      { step: '1', label: '채용공고 및 직무 분석', key: 'job_analysis' },
      { step: '2', label: '경험 정리', key: 'experience' },
      { step: '3', inline: true, label: '', items: [
        { key: 'resume', label: '이력서 작성' },
        { key: 'career_description', label: '경력기술서 작성' },
        { directUrl: 'https://www.latpeed.com/products/LimF9', label: '이직 컨설팅' },
      ]},
      { step: '4', label: '자소서 작성', expandable: true, items: [
        { key: 'motivation', label: '지원동기 작성' },
        { key: 'jobcompetency', label: '직무역량 작성' },
        { key: 'personality', label: '성격 장단점 작성' },
        { key: 'goalachievement', label: '목표수립 및 달성 작성' },
        { key: 'careergoal', label: '입사후 포부 작성' },
      ]},
      { step: '4', label: '자소서 멘토링', directUrl: 'https://www.latpeed.com/products/fKnUV' },
      { step: '5', inline: true, label: '', items: [
        { key: 'self_introduction', label: '1분 자기소개 준비' },
        { key: 'interview_new', label: '신입 면접 준비' },
        { key: 'interview_career', label: '경력 면접 준비' },
        { directUrl: 'https://www.latpeed.com/products/tZ5xw', label: '면접 멘토링' },
      ]},
    ];
    
    // 추가 서비스 (별도 섹션)
    const extraServices = [
      { label: 'CareerEngineer 전자책 / 멘토링', url: 'https://www.latpeed.com/spaces/0/stores/collections/68459e30db90f1ebed56226f' },
      { label: 'CareerEngineer 1-Hour 1:1 취업컨설팅', url: 'https://www.latpeed.com/products/S92cP' },
      { label: 'CareerEngineer 카카오톡 상담', url: 'https://open.kakao.com/me/careerengineer' },
    ];
    
    return (
      <>
        {/* 외부 클릭 감지용 오버레이 (투명) */}
        <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 50 }} />
        
        {/* 드롭다운 본체 */}
        <div style={{
          position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
          marginTop: 4, zIndex: 51,
          background: COLORS.white,
          borderRadius: RADIUS.base,
          border: `1px solid ${COLORS.border}`,
          boxShadow: '0 12px 32px rgba(14, 39, 80, 0.18)',
          minWidth: 720, maxWidth: 920,
          maxHeight: '70vh', overflowY: 'auto',
          padding: SPACING.sm,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {stepGroups.map((g, gi) => {
              if (g.expandable) {
                // 자소서 5대 항목 - 하위 항목 펼침
                const isCurrent = g.items.some(it => it.key === currentKey);
                return (
                  <div key={gi} style={{
                    padding: `10px ${SPACING.base}px`,
                    borderRadius: 6,
                    border: `1px solid ${isCurrent ? COLORS.accent2 : COLORS.border}`,
                    background: isCurrent ? '#FBFAF6' : COLORS.white,
                  }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, minHeight: 24 }}>
                      <span style={{
                        position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: 64, height: 24, borderRadius: 4,
                        background: isCurrent ? COLORS.accent : COLORS.bgAlt,
                        color: isCurrent ? COLORS.white : COLORS.sub,
                        fontSize: FONT.size.xs, fontWeight: FONT.weight.bold, fontFamily: FONT.family,
                      }}>STEP {g.step}</span>
                      <span style={{ fontSize: FONT.size.sm, fontWeight: FONT.weight.semibold, color: COLORS.accent }}>{g.label}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                      {g.items.map(it => {
                        const isCurrentItem = it.key === currentKey;
                        const link = it.directUrl ? { url: it.directUrl } : WORKBOOK_LINKS[it.key];
                        if (!link) return null;
                        if (isCurrentItem) {
                          return (
                            <span key={it.key} style={{ fontSize: FONT.size.sm, fontWeight: FONT.weight.bold, color: COLORS.accent, padding: '4px 0' }}>
                              · {it.label} <span style={{ fontSize: FONT.size.xs, color: COLORS.accent2, fontWeight: FONT.weight.semibold }}>(현재)</span>
                            </span>
                          );
                        }
                        return (
                          <a key={it.key} href={link.url} target="_blank" rel="noopener noreferrer"
                            style={{ fontSize: FONT.size.sm, color: COLORS.accent2, textDecoration: 'underline', textUnderlineOffset: 2, padding: '4px 0' }}>
                            · {it.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              
              if (g.inline) {
                // 인라인 다중 항목 (STEP 3 서류, STEP 5 면접) - 한 줄에 라벨 여러 개
                const isCurrent = g.items.some(it => it.key === currentKey);
                return (
                  <div key={gi} style={{
                    position: 'relative',
                    padding: `10px ${SPACING.base}px`,
                    borderRadius: 6,
                    border: `1px solid ${isCurrent ? COLORS.accent2 : COLORS.border}`,
                    background: isCurrent ? '#FBFAF6' : COLORS.white,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap',
                    minHeight: 44,
                  }}>
                    <span style={{
                      position: 'absolute', left: SPACING.base, top: '50%', transform: 'translateY(-50%)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 64, height: 24, borderRadius: 4,
                      background: isCurrent ? COLORS.accent : COLORS.bgAlt,
                      color: isCurrent ? COLORS.white : COLORS.sub,
                      fontSize: FONT.size.xs, fontWeight: FONT.weight.bold, fontFamily: FONT.family,
                    }}>STEP {g.step}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: FONT.size.sm, fontWeight: FONT.weight.semibold, color: COLORS.accent, flexWrap: 'wrap' }}>
                    {g.label && (<>
                      <span>{g.label}</span>
                      <span style={{ color: COLORS.sub, fontSize: FONT.size.sm }}>·</span>
                    </>)}
                    {g.items.map((it, ii) => {
                      const isCurrentItem = it.key === currentKey;
                      const link = it.directUrl ? { url: it.directUrl } : WORKBOOK_LINKS[it.key];
                      if (!link) return null;
                      return (
                        <span key={it.key} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                          {isCurrentItem ? (
                            <span style={{ fontSize: FONT.size.sm, fontWeight: FONT.weight.bold, color: COLORS.accent }}>
                              {it.label} <span style={{ fontSize: FONT.size.xs, color: COLORS.accent2, fontWeight: FONT.weight.semibold }}>(현재)</span>
                            </span>
                          ) : (
                            <a href={link.url} target="_blank" rel="noopener noreferrer"
                              style={{ fontSize: FONT.size.sm, color: COLORS.accent2, textDecoration: 'underline', textUnderlineOffset: 2, fontWeight: FONT.weight.medium }}>
                              {it.label}
                            </a>
                          )}
                          {ii < g.items.length - 1 && <span style={{ color: COLORS.sub, fontSize: FONT.size.xs }}>/</span>}
                        </span>
                      );
                    })}
                    </span>
                  </div>
                );
              }
              
              // 일반 단일 STEP - 라벨 자체가 하이퍼링크
              const isCurrent = g.key === currentKey;
              const link = g.directUrl ? { url: g.directUrl } : WORKBOOK_LINKS[g.key];
              if (!link) return null;
              
              if (isCurrent) {
                return (
                  <div key={gi} style={{
                    position: 'relative',
                    padding: `10px ${SPACING.base}px`,
                    borderRadius: 6,
                    border: `1px solid ${COLORS.accent2}`,
                    background: '#FBFAF6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    minHeight: 44,
                  }}>
                    <span style={{
                      position: 'absolute', left: SPACING.base, top: '50%', transform: 'translateY(-50%)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 64, height: 24, borderRadius: 4,
                      background: COLORS.accent, color: COLORS.white,
                      fontSize: FONT.size.xs, fontWeight: FONT.weight.bold, fontFamily: FONT.family,
                    }}>STEP {g.step}</span>
                    <span style={{ fontSize: FONT.size.sm, fontWeight: FONT.weight.bold, color: COLORS.accent }}>{g.label} <span style={{ fontSize: FONT.size.xs, color: COLORS.accent2, fontWeight: FONT.weight.semibold }}>(현재)</span></span>
                  </div>
                );
              }
              
              return (
                <a key={gi} href={link.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    position: 'relative',
                    padding: `10px ${SPACING.base}px`,
                    borderRadius: 6,
                    border: `1px solid ${COLORS.border}`,
                    background: COLORS.white,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'all 150ms',
                    minHeight: 44,
                  }}
                  className="ce-step-nav-item">
                  <span style={{
                    position: 'absolute', left: SPACING.base, top: '50%', transform: 'translateY(-50%)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 64, height: 24, borderRadius: 4,
                    background: COLORS.bgAlt, color: COLORS.sub,
                    fontSize: FONT.size.xs, fontWeight: FONT.weight.bold, fontFamily: FONT.family,
                  }}>STEP {g.step}</span>
                  <span style={{ fontSize: FONT.size.sm, fontWeight: FONT.weight.medium, color: COLORS.accent2, textDecoration: 'underline', textUnderlineOffset: 2 }}>{g.label}</span>
                </a>
              );
            })}
          </div>
          
          {/* 추가 서비스 섹션 */}
          <div style={{ marginTop: SPACING.md, paddingTop: SPACING.md, borderTop: `1px solid ${COLORS.border}` }}>
            <p style={{ fontSize: FONT.size.sm, fontWeight: FONT.weight.medium, color: COLORS.sub, padding: `0 ${SPACING.base}px`, margin: 0, marginBottom: SPACING.md, lineHeight: FONT.lineHeight.relaxed, textAlign: 'center' }}>개인적인 경험, 직무, 공백기 등에 대한 고민이 있다면<br/>1:1로 CareerEngineer와 함께 더 깊은 이야기를 나눌 수도 있습니다.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {extraServices.map((svc, si) => (
                <a key={si} href={svc.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    padding: `10px ${SPACING.base}px`,
                    borderRadius: 6,
                    border: `1px solid ${COLORS.border}`,
                    background: COLORS.white,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none',
                    fontSize: FONT.size.sm, fontWeight: FONT.weight.semibold,
                    color: COLORS.accent,
                    transition: 'all 150ms',
                  }}
                  className="ce-step-nav-item">
                  {svc.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  const reset = () => { setPage("welcome"); setQi(0); setAns({}); setResult(null); setExpandedAction(0); };

  // WELCOME
  if (page === "welcome") return (
    <div style={css.wrap}>
      <FirstVisitModal open={showHelp} onClose={() => setShowHelp(false)} title="취업준비 로드맵 사용 안내" steps={[
        '7개 질문에 답하면 <strong>지금 당장 해야 할 일</strong>이 추천됩니다.',
        '각 질문은 본인의 현재 상황과 가장 가까운 답변을 고르면 됩니다.',
        '결과 화면에서 추천된 액션을 <strong>순서대로 실행</strong>하세요.',
        '진단은 언제든 다시 받을 수 있으니 정직하게 답변하세요.',
      ]} />
      {/* sticky 헤더 (가이드 PART 7-6) */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: '#F2F1EC', borderBottom: `1px solid #6E7A8F33`, padding: '12px 16px', marginLeft: -16, marginRight: -16, marginTop: -16, marginBottom: 16, boxShadow: '0 2px 8px rgba(14, 39, 80, 0.12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <CELockupA height={32} />
          <div style={{ position: 'relative', flex: 1, display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => setShowStepNav(v => !v)} style={{ 
              background: COLORS.bgAlt, border: 'none', cursor: 'pointer',
              fontSize: 16, color: COLORS.accent, textAlign: 'center',
              padding: '4px 12px', borderRadius: 4, fontFamily: 'inherit',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4,
            }} title="전체 7단계 보기" className="ce-step-nav-trigger">
              STEP 0 · 취업준비 진단
              <span style={{ fontSize: 16, color: COLORS.accent, opacity: 1, transform: showStepNav ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }}>▾</span>
            </button>
            <StepNavigatorDropdown open={showStepNav} onClose={() => setShowStepNav(false)} currentKey="career_roadmap" />
          </div>
          <button disabled style={{padding: '8px 14px', borderRadius: 8, border: 'none', fontSize: 16, fontWeight: 600, fontFamily: 'inherit', background: COLORS.accent, color: COLORS.white, opacity: 0.4, cursor: 'not-allowed'}} title="진단 완료 후 활성화됩니다">
            결과 저장
          </button>
        </div>
      </div>
      {/* ═══ 브랜드 블록 (PART 7-6-1 규격) ═══ */}
      <div style={{textAlign:"center", padding:"16px 0 16px"}}>
        {/* CE 락업 — 가이드 PART 1-4-6 인터랙티브 첫 화면 */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
          <CELockupA height={56} />
        </div>
        {/* ② 슬로건 — 중간 크기, Bold, accent — 워드마크 아래 */}
        <p style={{fontSize:18, fontWeight:700, color:COLORS.accent, margin:"8px 0 0"}}>
          생각하는 힘으로 커리어를 설계하다
        </p>
        {/* ③ 브랜드 메시지 — 작은 글씨, Regular, sub — 슬로건 바로 아래, 공백 없이 */}
        <p style={{fontSize: 16, fontWeight:400, color:COLORS.sub, margin:"4px 0 0", lineHeight:1.6}}>
          취업이 막막하던 사람도 CareerEngineer의 질문에 답하다 보면,<br/>
          생각하는 힘이 길러집니다. 일하는 방식이 달라집니다. 채용담당자가 먼저 알아봅니다.
        </p>
      </div>

      {/* ═══ 구분선 ═══ */}
      <div style={{borderTop:`1px solid ${COLORS.border}`, margin:"24px 0 32px"}}/>

      {/* ═══ 앱 제목 ═══ */}
      <div style={{textAlign:"center", padding:"0 0 32px"}}>
        <div style={{fontSize: 16, letterSpacing:4, color:COLORS.sub, marginBottom:12, fontWeight:500}}>STEP 0 · 진단</div>
        <h1 style={{fontSize:26, fontWeight:700, color:COLORS.accent, lineHeight:1.35, margin:"0 0 12px"}}>취업 준비,<br/>지금 뭘 해야 할까?</h1>
        <p style={{fontSize: 16, color:COLORS.sub, lineHeight:1.7, margin:"0 0 36px"}}>7개 질문에 답하면<br/>지금 당장 해야 할 일을 알려드립니다</p>
        <div onClick={()=>setPage("quiz")} style={{display:"inline-block", background:COLORS.accent, color:"#fff", borderRadius:14, padding:"16px 48px", cursor:"pointer", fontSize: 16, fontWeight:600}}>
          시작하기
        </div>
      </div>
      <div style={{textAlign:"center", padding:"24px 0", borderTop:`1px solid ${COLORS.border}`}}>
        <p style={{fontSize: 16, color:COLORS.sub, lineHeight:1.6, margin:0}}>소요시간 약 2분<br/>내 상황을 진단하고 맞춤 액션을 받아보세요</p>
      </div>
      <div style={{marginTop:24, padding:"16px 0", borderTop:`1px solid ${COLORS.border}`}}>
        <p style={{fontSize: 16, color:COLORS.sub, textAlign:"center", lineHeight:1.6, margin:"0 0 8px", fontWeight:600}}>
          © 2026 CareerEngineer. All Rights Reserved.
        </p>
        <p style={{fontSize: 16, color:"#0E2750", textAlign:"center", lineHeight:1.6, margin:0}}>
          저작권법에 의하여 보호받는 저작물이므로 무단 전재와 무단 복제를 금합니다. 이 자료는 구매하신 분의 취업을 위한 개인 학습 용도로 자유롭게 활용하실 수 있으나, 자료의 전부 또는 일부를 다른 사람에게 공유하거나, 복제·재판매·재배포하는 것은 금지되어 있습니다. <strong>이를 위반할 경우 관련 법률에 따라 민·형사상 책임을 질 수 있습니다.</strong>
        </p>
      </div>
      <StickyFooter />
    </div>
  );

  // QUIZ
  if (page === "quiz") {
    const q = QS[qi];
    return (
      <div style={css.wrap}>
        {/* sticky 헤더 (가이드 PART 7-6) */}
        <div style={{ position: 'sticky', top: 0, zIndex: 10, background: '#F2F1EC', borderBottom: `1px solid #6E7A8F33`, padding: '12px 16px', marginLeft: -16, marginRight: -16, marginTop: -16, marginBottom: 16, boxShadow: '0 2px 8px rgba(14, 39, 80, 0.12)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.accent, letterSpacing: -0.3 }}>CareerEngineer</div>
            <div style={{ position: 'relative', flex: 1, display: 'flex', justifyContent: 'center' }}>
              <button onClick={() => setShowStepNav(v => !v)} style={{ 
                background: COLORS.bgAlt, border: 'none', cursor: 'pointer',
                fontSize: FONT.size.sm, color: COLORS.accent, textAlign: 'center',
                padding: '4px 12px', borderRadius: 4, fontFamily: FONT.family,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4,
              }} title="전체 7단계 보기" className="ce-step-nav-trigger">
                STEP 0 · 취업준비 진단
                <span style={{ fontSize: FONT.size.xs, color: COLORS.accent, opacity: 1, transform: showStepNav ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }}>▾</span>
              </button>
              <StepNavigatorDropdown open={showStepNav} onClose={() => setShowStepNav(false)} currentKey="career_roadmap" />
            </div>
            <span style={{ fontSize: 16, color: COLORS.sub, whiteSpace: 'nowrap' }}>{qi+1}/{QS.length}</span>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",padding:"20px 0 16px",gap:10}}>
          <button onClick={()=>{if(qi>0)setQi(qi-1);else setPage("welcome");}} style={{cursor:"pointer",fontSize:16,color:COLORS.sub,padding:"4px 8px",border:"none",background:"none"}}>이전</button>
          <div style={{flex:1,height:4,background:COLORS.border,borderRadius:2}}>
            <div style={{height:4,background:COLORS.accent,borderRadius:2,width:`${((qi+1)/QS.length)*100}%`,transition:"width .3s"}}/>
          </div>
          <span style={{fontSize: 16,color:COLORS.sub}}>{qi+1}/{QS.length}</span>
        </div>

        <div style={{padding:"24px 0"}}>
          <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 20px",lineHeight:1.4}}>{q.q}</h2>
          {q.opts.map((opt,i) => {
            const selected = ans[q.id] === opt.v;
            return (
              <div key={i} onClick={()=>selectOpt(q.id, opt.v)}
                style={{padding:"16px 18px",borderRadius:14,marginBottom:8,border:`1.5px solid ${selected?COLORS.accent2:COLORS.border}`,background:selected?COLORS.blueBg:"#fff",cursor:"pointer",transition:"all .15s"}}
                onMouseEnter={e=>{if(!selected)e.currentTarget.style.borderColor=COLORS.accent2+"60";}}
                onMouseLeave={e=>{if(!selected)e.currentTarget.style.borderColor=COLORS.border;}}>
                <div style={{fontSize: 16,fontWeight:600,color:selected?COLORS.accent2:COLORS.accent,marginBottom:2}}>{opt.l}</div>
                <div style={{fontSize: 16,color:COLORS.sub}}>{opt.d}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // RESULT
  if (page === "result" && result) {
    const statusIcon = { done: "\u2713", partial: "\u25CB", todo: "\u2014", recheck: "!" };
    const statusColor = { done: COLORS.green, partial: COLORS.yellow, todo: COLORS.sub, recheck: COLORS.yellow };
    const statusBg = { done: COLORS.greenBg, partial: COLORS.yellowBg, todo: "#FBFAF6", recheck: COLORS.yellowBg };
    const statusLabel = { done: "완료", partial: "보완 필요", todo: "아직 안 함", recheck: "앞 단계 먼저" };

    return (
      <div style={css.wrap}>
        <div style={{padding:"24px 0 16px",textAlign:"center"}}>
          <div style={{fontSize: 16,letterSpacing:3,color:COLORS.sub,marginBottom:8}}>진단 결과</div>
          <h1 style={{fontSize:22,fontWeight:700,margin:"0 0 6px"}}>지금 집중해야 할 단계</h1>
          <div style={{display:"inline-block",background:COLORS.accent,color:"#fff",borderRadius:10,padding:"8px 20px",fontSize: 16,fontWeight:600,marginTop:8}}>
            STEP {result.weakest.step}. {result.weakest.name}
          </div>
        </div>

        {/* Immediate Actions */}
        <div style={{margin:"20px 0"}}>
          <h2 style={{fontSize:16,fontWeight:700,margin:"0 0 12px"}}>지금 당장 하세요</h2>
          {result.now.map((action, i) => {
            const isOpen = expandedAction === i;
            return (
              <div key={i} style={{marginBottom:8}}>
                <div onClick={()=>setExpandedAction(isOpen?-1:i)}
                  style={{padding:"14px 16px",borderRadius:isOpen?"14px 14px 0 0":"14px",background:"#fff",border:`1px solid ${COLORS.border}`,cursor:"pointer",display:"flex",alignItems:"flex-start",gap:12}}>
                  <div style={{minWidth:28,height:28,borderRadius:8,background:COLORS.accent2,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize: 16,fontWeight:700,flexShrink:0}}>{i+1}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize: 16,fontWeight:600,lineHeight:1.4}}>{action.text}</div>
                  </div>
                  <span style={{fontSize: 16,color:COLORS.sub,transform:isOpen?"rotate(180deg)":"rotate(0)",transition:"transform .2s",flexShrink:0,marginTop:4}}>▼</span>
                </div>
                {isOpen && (
                  <div style={{padding:"14px 16px 14px 56px",background:"#FBFAF6",borderRadius:"0 0 14px 14px",border:`1px solid ${COLORS.border}`,borderTop:"none",fontSize: 16,color:"#1B3A6B",lineHeight:1.7,whiteSpace:"pre-line"}}>
                    {action.detail}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Relevant Docs */}
        {result.docs.length > 0 && (
          <div style={{margin:"20px 0"}}>
            <h2 style={{fontSize:16,fontWeight:700,margin:"0 0 12px"}}>이 단계에서 도움되는 자료</h2>
            {result.docs.map((d, i) => (
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",borderRadius:12,marginBottom:6,border:`1px solid ${COLORS.border}`,background:"#fff"}}>
                <div style={{flex:1, textAlign:"center"}}>
                  <div style={{fontSize: 16,fontWeight:500}}>{d.n}</div>
                </div>
                {d.u ? (
                  <a href={d.u} target="_blank" rel="noopener noreferrer" style={{fontSize: 16,color:COLORS.accent2,textDecoration:"none",fontWeight:500,padding:"6px 14px",border:`1px solid ${COLORS.accent2}`,borderRadius:8}}>보기</a>
                ) : (
                  <span style={{fontSize: 16,color:"#6E7A8F",padding:"6px 14px",border:`1px solid ${COLORS.border}`,borderRadius:8}}>링크 준비 중</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Big Picture */}
        <div style={{margin:"20px 0"}}>
          <h2 style={{fontSize:16,fontWeight:700,margin:"0 0 12px"}}>앞으로의 큰 그림</h2>
          <div style={{borderRadius:14,border:`1px solid ${COLORS.border}`,overflow:"hidden"}}>
            {result.remaining.map((r, i) => (
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderBottom:i<result.remaining.length-1?`1px solid ${COLORS.border}`:"none",background:r.step===result.weakest.step?"#F2F1EC":"#fff"}}>
                <div style={{minWidth:24,height:24,borderRadius:6,background:statusBg[r.status],display:"flex",alignItems:"center",justifyContent:"center",fontSize: 16,fontWeight:700,color:statusColor[r.status]}}>
                  {statusIcon[r.status]}
                </div>
                <div style={{flex:1}}>
                  <span style={{fontSize: 16,fontWeight:r.step===result.weakest.step?700:500}}>STEP {r.step}. {r.name}</span>
                  {r.step===result.weakest.step && <span style={{fontSize: 16,color:COLORS.accent2,fontWeight:600,marginLeft:8}}>지금 여기</span>}
                </div>
                <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:90,fontSize: 16,padding:"4px 8px",borderRadius:20,background:statusColor[r.status]+"18",color:statusColor[r.status],fontWeight:500,flexShrink:0}}>{statusLabel[r.status]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ 관련 자료 + 멘토링 안내 (PART 6-4, 7-8) ═══ */}
        <div style={{ background: '#F2F1EC', border: '1px solid rgba(27, 58, 107, 0.2)', borderRadius: 10, padding: 16, marginTop: 24, marginBottom: 16 }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#0E2750', letterSpacing: 0.5, textTransform: 'uppercase', margin: 0, marginBottom: 8 }}>INFO · 다음 STEP 안내</p>
          <p style={{ fontSize: 16, color: '#0E2750', margin: 0, lineHeight: 1.6 }}>진단 결과에서 추천한 액션을 순서대로 실행하세요</p>
        </div>

        <div style={{ background: '#FBFAF6', borderRadius: 10, padding: 16, marginBottom: 16 }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#0E2750', margin: 0, marginBottom: 8 }}>함께 보면 좋은 자료</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 8, padding: 8, background: '#fff', borderRadius: 6, alignItems: 'flex-start' }}>
              <div style={{ width: 4, background: '#0E2750', borderRadius: 2, alignSelf: 'stretch', minHeight: 28 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 16, fontWeight: 600, color: '#0E2750', margin: 0 }}>채용공고 분석 & 직무분석 가이드</p>
                <p style={{ fontSize: 16, color: '#6E7A8F', margin: 0, marginTop: 2, lineHeight: 1.6 }}>방향 설정 후 직무를 구체화</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, padding: 8, background: '#fff', borderRadius: 6, alignItems: 'flex-start' }}>
              <div style={{ width: 4, background: '#0E2750', borderRadius: 2, alignSelf: 'stretch', minHeight: 28 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 16, fontWeight: 600, color: '#0E2750', margin: 0 }}>경험정리 가이드 & 워크북</p>
                <p style={{ fontSize: 16, color: '#6E7A8F', margin: 0, marginTop: 2, lineHeight: 1.6 }}>진단 결과에 따른 다음 단계 실행</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#FBFAF6', border: '1px solid rgba(168, 133, 63, 0.2)', borderRadius: 10, padding: 16, marginBottom: 16 }}>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#A8853F', letterSpacing: 0.5, textTransform: 'uppercase', margin: 0, marginBottom: 12, textAlign: 'center' }}>1:1 멘토링 · 컨설팅 안내</p>
          <p style={{ fontSize: 16, color: '#0E2750', margin: 0, marginBottom: 16, lineHeight: 1.6, textAlign: 'center' }}>혼자 막히는 부분이 있다면 시니어 현직자와 1:1로 풀어보세요. 멘토링 수강 시 관련 가이드워크북이 무료 제공됩니다.</p>
          <div style={{ display: 'grid', gap: 8 }}>
            <a href="https://www.latpeed.com/products/S92cP" target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: 12, background: '#fff', borderRadius: 8, border: '1px solid #6E7A8F33', textDecoration: 'none', textAlign: 'center' }}>
              <p style={{ fontSize: 16, fontWeight: 600, color: '#0E2750', margin: 0 }}>CareerEngineer 1-Hour 1:1 취업컨설팅</p>
              <p style={{ fontSize: 16, color: '#6E7A8F', margin: 0, marginTop: 4, lineHeight: 1.5 }}>방향 설정이 막막하다면 — 자소서·이력서·면접 중 핵심 고민 1시간 집중. 기초 전자책 5종 무료 제공.</p>
            </a>
            <a href="https://www.latpeed.com/products/fKnUV" target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: 12, background: '#fff', borderRadius: 8, border: '1px solid #6E7A8F33', textDecoration: 'none', textAlign: 'center' }}>
              <p style={{ fontSize: 16, fontWeight: 600, color: '#0E2750', margin: 0 }}>자소서 멘토링 프로그램</p>
              <p style={{ fontSize: 16, color: '#6E7A8F', margin: 0, marginTop: 4, lineHeight: 1.5 }}>서류 합격이 어렵다면 — 채용담당자 관점 첨삭. 자소서 5종 + 경험정리 가이드 무료 제공.</p>
            </a>
            <a href="https://www.latpeed.com/products/tZ5xw" target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: 12, background: '#fff', borderRadius: 8, border: '1px solid #6E7A8F33', textDecoration: 'none', textAlign: 'center' }}>
              <p style={{ fontSize: 16, fontWeight: 600, color: '#0E2750', margin: 0 }}>면접 멘토링 프로그램</p>
              <p style={{ fontSize: 16, color: '#6E7A8F', margin: 0, marginTop: 4, lineHeight: 1.5 }}>실전 답변이 안 나온다면 — 면접관 관점 모의면접. 1분 자기소개 + 면접 신입/경력 가이드 무료 제공.</p>
            </a>
            <a href="https://www.latpeed.com/products/LimF9" target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: 12, background: '#fff', borderRadius: 8, border: '1px solid #6E7A8F33', textDecoration: 'none', textAlign: 'center' }}>
              <p style={{ fontSize: 16, fontWeight: 600, color: '#0E2750', margin: 0 }}>이직 컨설팅 (경력직)</p>
              <p style={{ fontSize: 16, color: '#6E7A8F', margin: 0, marginTop: 4, lineHeight: 1.5 }}>이직 결정이 어렵다면 — 결정부터 면접까지 1:1 동행. 경력기술서 + 이력서 + 면접 경력직 가이드 무료 제공.</p>
            </a>
          </div>
        </div>

        {/* Retry + Save */}
        <div style={{textAlign:"center",padding:"20px 0 32px",display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <div onClick={() => {
            const today = new Date().toISOString().slice(0,10);
            const persona = who === 'newbie' ? '신입' : who === 'career' ? '경력' : who === 'switch' ? '이직' : '미선택';
            const lines = ['CareerEngineer 취업준비 진단 결과', '='.repeat(60)];
            lines.push(`진단일: ${today}`);
            lines.push(`페르소나: ${persona}`);
            lines.push(`\n━━━ 가장 약한 단계 ━━━`);
            lines.push(`STEP ${result.weakest.step}. ${result.weakest.name}`);
            lines.push(`\n━━━ 지금 해야 할 일 ━━━`);
            result.now.forEach((a, i) => {
              lines.push(`\n${i+1}. ${a.text}`);
              if (a.detail) lines.push(`   ${a.detail}`);
            });
            if (result.docs.length > 0) {
              lines.push(`\n━━━ 이 단계에서 도움되는 자료 ━━━`);
              result.docs.forEach(d => lines.push(`• ${d.n}${d.u ? ` (${d.u})` : ''}`));
            }
            lines.push(`\n━━━ 앞으로의 큰 그림 ━━━`);
            const statusKr = { done: '완료', partial: '보완 필요', todo: '아직 안 함', locked: '앞 단계 먼저' };
            result.remaining.forEach(r => lines.push(`STEP ${r.step}. ${r.name} - ${statusKr[r.status] || r.status}`));
            lines.push(`\n━━━ 1:1 멘토링 · 컨설팅 안내 ━━━`);
            lines.push(`• CareerEngineer 1-Hour 1:1 취업컨설팅: https://www.latpeed.com/products/S92cP`);
            lines.push(`• 자소서 멘토링: https://www.latpeed.com/products/fKnUV`);
            lines.push(`• 면접 멘토링: https://www.latpeed.com/products/tZ5xw`);
            lines.push(`• 이직 컨설팅: https://www.latpeed.com/products/LimF9`);
            lines.push(`\n${'='.repeat(60)}`);
            lines.push(`© 2026 CareerEngineer. All Rights Reserved.`);
            const h = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>취업준비 진단 결과</title><style>body{font-family:'맑은 고딕',sans-serif;line-height:1.7;padding:40px;white-space:pre-wrap;color:#0E2750}</style></head><body>${lines.join('\n')}</body></html>`;
            const blob = new Blob([h], { type: 'application/msword;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `취업준비_진단결과_${today}.doc`;
            a.click();
            URL.revokeObjectURL(url);
          }} style={{display:"inline-block",padding:"12px 32px",borderRadius:12,background:COLORS.accent,color:COLORS.white,cursor:"pointer",fontSize: 16,fontWeight:600}}>
            결과 저장 (.doc)
          </div>
          <div onClick={reset} style={{display:"inline-block",padding:"12px 32px",borderRadius:12,border:`1px solid ${COLORS.border}`,cursor:"pointer",fontSize: 16,color:COLORS.sub}}>
            다시 진단하기
          </div>
        </div>
        <StickyFooter />
      </div>
    );
  }

  return null;
}
