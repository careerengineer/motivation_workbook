import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Download, Lock, HelpCircle, Eye, Edit3 } from 'lucide-react';

const MotivationWorkbook = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [currentPhase, setCurrentPhase] = useState('round1');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [showGuide, setShowGuide] = useState({});
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showRawAnswers, setShowRawAnswers] = useState(false);
  const [finalText, setFinalText] = useState('');
  const [basicInfo, setBasicInfo] = useState({
    industry: '',
    position: '',
    company: '',
  });
  const [answers, setAnswers] = useState({});

  const handleLogin = () => {
    if (password === 'career2025') {
      setIsAuthenticated(true);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const round1Steps = [
    {
      id: 0,
      title: '기본 정보 입력',
      subtitle: '지원할 산업, 직무, 회사를 입력하세요',
    },
    {
      id: 1,
      title: 'STEP 1: 관심 계기',
      subtitle: '이 분야에 관심을 갖게 된 구체적인 순간',
      questions: [
        {
          id: 'q1_1_1',
          label: 'Q1.1.1. 이 분야에 처음 관심을 갖게 된 구체적인 계기는 무엇인가요?',
          hint: '언제, 어디서, 무엇을 통해 관심이 생겼는지 구체적으로',
          placeholder: '예: 대학교 2학기 "마케팅원론" 수업에서 진행한 "스타트업 마케팅 전략 수립" 팀 프로젝트가 계기였습니다...',
          rows: 4,
          guide: {
            description: '답변 가이드: 언제, 어디서, 무엇을 통해 관심이 생겼는지 구체적으로',
            diagnosis: '즉석자가진단: 면접관이 "그때 어떤 기분이었나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '정확히 언제였나요? (학년, 학기, 년도)',
              '어떤 상황에서였나요? (수업, 동아리, 대외활동)',
              '무엇을 보고/듣고/경험했나요?',
              '그때 어떤 감정을 느꼈나요?',
            ],
            ifDifficult: '이 직무를 알게 된 첫 순간을 떠올려보세요. 관련 수업이나 책, 영상을 처음 접한 때를 생각해보세요. 주변 사람 중 이 일을 하는 사람을 만난 경험을 떠올려보세요.',
            ifStillDifficult: '최소한 인터넷 검색이라도 했을 것입니다. "구글에서 마케팅 직무를 검색했다", "관련 블로그를 찾아봤다", "취업 카페에 가입했다" 등 아주 작은 행동이라도 구체적으로 적어보세요.',
            example: '대학교 2학년 2학기 "마케팅원론" 수업에서 진행한 "스타트업 마케팅 전략 수립" 팀 프로젝트가 계기였습니다. 실제 스타트업 대표님과 협업하여 마케팅 전략을 수립하는 과정에서...',
          },
        },
        {
          id: 'q1_1_2',
          label: 'Q1.1.2. 그 계기에서 무엇이 특별히 인상 깊었나요?',
          hint: '단순 감상이 아닌 구체적인 깨달음이나 발견',
          placeholder: '예: 데이터 분석을 통해 20대 타겟의 숨은 니즈를 발견하고, 이를 바탕으로 만든 캠페인이 실제로 300% 매출 상승...',
          rows: 3,
          guide: {
            description: '답변 가이드: 단순 감상이 아닌 구체적인 깨달음이나 발견',
            diagnosis: '즉석자가진단: "왜 그게 인상 깊었어요?"라는 추가 질문에 답변 가능한가?',
            helpQuestions: [
              '어떤 부분이 새로웠나요?',
              '기존 생각과 다른 점은 무엇이었나요?',
              '어떤 가능성을 발견했나요?',
            ],
            ifDifficult: '그 경험에서 가장 기억에 남는 순간이나 느낌을 떠올려보세요.',
            ifStillDifficult: '작은 발견이라도 의미가 있습니다. "이런 방식도 있구나", "생각보다 재미있었다" 같은 솔직한 느낌도 좋습니다.',
            example: '데이터 분석을 통해 20대 타겟의 숨은 니즈를 발견하고, 이를 바탕으로 만든 캠페인이 실제로 300% 매출 상승이라는 결과로 이어지는 것을 보며...',
          },
        },
        {
          id: 'q1_1_3',
          label: 'Q1.1.3. 그 이후 어떤 생각이나 행동의 변화가 있었나요?',
          hint: '관심이 실제 행동으로 이어진 구체적 사례',
          placeholder: '예: 그날 저녁부터 마케팅 관련 유튜브 채널을 구독하기 시작했고, 다음 주에는 마케팅 동아리에 가입했습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 관심이 실제 행동으로 이어진 구체적 사례',
            diagnosis: '즉석자가진단: "그래서 뭘 했어요?"라는 질문에 3가지 이상 답변 가능한가?',
            helpQuestions: [
              '바로 다음 날/주에 뭘 했나요?',
              '정보 수집은 어떻게 시작했나요?',
              '일상에서 달라진 점은?',
            ],
            ifDifficult: '관심이 생긴 후 실제로 한 행동을 떠올려보세요. 관련 유튜브를 찾아봤거나, 책을 샀거나, 선배에게 물어봤거나 하는 작은 행동도 의미가 있습니다.',
            ifStillDifficult: '최소한 인터넷 검색이라도 했을 것입니다. "구글에서 마케팅 직무를 검색했다", "관련 블로그를 찾아봤다", "취업 카페에 가입했다" 등 아주 작은 행동이라도 구체적으로 적어보세요.',
            example: '그날 저녁부터 마케팅 관련 유튜브 채널을 구독하기 시작했고, 다음 주에는 마케팅 동아리에 가입했습니다. 매일 1시간씩 마케팅 사례를 분석하며...',
          },
        },
      ],
    },
    {
      id: 2,
      title: 'STEP 2: 핵심 메시지',
      subtitle: '지원동기의 핵심을 한 문장으로',
      questions: [
        {
          id: 'q1_2_1',
          label: 'Q1.2.1. 관심을 이어가기 위해 구체적으로 어떤 활동을 했나요?',
          hint: '측정 가능하고 검증 가능한 활동',
          placeholder: '예: 6개월간 마케팅 이론서 10권을 읽고, 브랜드 분석 블로그를 운영하며 20개 기업을 분석했습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 측정 가능하고 검증 가능한 활동',
            diagnosis: '즉석자가진단: "그 중에서 가장 도움이 된 것은?"이라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '구체적으로 어떤 활동을 했나요?',
              '얼마나 오래, 자주 했나요?',
              '어떤 결과물이 나왔나요?',
            ],
            ifDifficult: '온라인 강의 수강, 독서, 동아리 활동, 개인 프로젝트 등을 떠올려보세요.',
            ifStillDifficult: '작은 활동도 의미가 있습니다. "매일 30분씩 관련 뉴스 읽기", "주 1회 스터디" 등도 충분합니다.',
            example: '6개월간 마케팅 이론서 10권을 읽고, 브랜드 분석 블로그를 운영하며 20개 기업을 분석했습니다. 또한 마케팅 동아리에서 2개 프로젝트를 진행했습니다.',
          },
        },
        {
          id: 'q1_2_2',
          label: 'Q1.2.2. 지금 내가 보유한 이 직무 관련 가장 강력한 역량은?',
          hint: '구체적 경험과 성과로 입증 가능한 역량',
          placeholder: '예: MZ세대 트렌드 분석 능력과 SNS 콘텐츠 기획 역량입니다. 인스타그램 계정을 3개월 만에 팔로워 1,500명...',
          rows: 3,
          guide: {
            description: '답변 가이드: 구체적 경험과 성과로 입증 가능한 역량',
            diagnosis: '즉석자가진단: "그 역량을 어떻게 증명할 수 있어요?"라고 물으면 구체적 증거 제시 가능한가?',
            helpQuestions: [
              '가장 자신 있는 역량은?',
              '그것을 보여주는 경험은?',
              '측정 가능한 성과는?',
            ],
            ifDifficult: '프로젝트에서 맡았던 역할이나 칭찬받았던 부분을 떠올려보세요.',
            ifStillDifficult: '작은 성과라도 구체화하세요. "PPT 제작", "자료 조사", "일정 관리" 등도 역량입니다.',
            example: 'MZ세대 트렌드 분석 능력과 SNS 콘텐츠 기획 역량입니다. 인스타그램 계정을 3개월 만에 팔로워 1,500명까지 성장시켰고, 평균 참여율 8%를 달성했습니다.',
          },
        },
        {
          id: 'q1_2_3',
          label: 'Q1.2.3. 여러 회사 중 왜 이 회사인가요?',
          hint: '회사의 구체적 특성과 본인의 연결점',
          placeholder: '예: OOO만의 \'데이터 기반 의사결정\' 문화와 \'빠른 실행력\'이 제가 추구하는 마케팅 방식과 정확히 일치합니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 회사의 구체적 특성과 본인의 연결점',
            diagnosis: '즉석자가진단: "다른 회사는 왜 안 되나요?"라고 물으면 차별점 설명 가능한가?',
            helpQuestions: [
              '이 회사만의 특별한 점은?',
              '나의 가치관과 맞는 부분은?',
              '경쟁사 대비 차별점은?',
            ],
            ifDifficult: '회사 홈페이지의 핵심 가치, 비전, 문화를 확인하고 본인과의 연결점을 찾아보세요.',
            ifStillDifficult: '업계 선도 기업, 혁신적 제품/서비스, 성장 가능성 등 객관적 강점도 좋습니다.',
            example: 'OOO만의 \'데이터 기반 의사결정\' 문화와 \'빠른 실행력\'이 제가 추구하는 마케팅 방식과 정확히 일치합니다. 또한 신입에게도 과감한 도전 기회를 주는 문화가 매력적입니다.',
          },
        },
        {
          id: 'q1_2_4',
          label: 'Q1.2.4. 위 세 가지를 하나로 연결한 핵심 문장을 작성하세요',
          hint: '관심 계기 + 나의 역량 + 회사 선택 이유',
          placeholder: '예: 데이터로 고객을 이해하는 마케팅에 매료되어 관련 역량을 키워왔고, 이를 가장 잘 발휘할 수 있는 곳이 OOO라고 확신합니다.',
          rows: 2,
          guide: {
            description: '답변 가이드: 관심 계기 + 나의 역량 + 회사 선택 이유를 한 문장으로',
            diagnosis: '즉석자가진단: 이 문장만으로 지원 이유가 명확히 전달되나요?',
            helpQuestions: [
              '세 가지가 자연스럽게 연결되나요?',
              '한 문장으로 요약이 가능한가요?',
              '이 문장이 나를 대표하나요?',
            ],
            ifDifficult: '템플릿을 활용하세요: "[계기]에 관심을 갖고 [활동]을 통해 [역량]을 키웠으며, [회사 특성] 때문에 지원합니다."',
            ifStillDifficult: '각 부분을 "그래서"로 연결해보세요. 자연스럽게 이어지는지 확인하세요.',
            example: '데이터로 고객을 이해하는 마케팅에 매료되어 관련 역량을 키워왔고, 이를 가장 잘 발휘할 수 있는 곳이 OOO라고 확신합니다.',
          },
        },
      ],
    },
    {
      id: 3,
      title: 'STEP 3: 관심 계기 구체화',
      subtitle: '첫 관심이 어떻게 깊어졌는지',
      questions: [
        {
          id: 'q1_3_1',
          label: 'Q1.3.1. Q1.1.1(이 분야에 처음 관심을 갖게 된 구체적인 계기는 무엇인가요?)의 계기가 일어난 구체적 상황을 묘사해주세요',
          hint: '시간, 장소, 상황의 디테일',
          placeholder: '예: 2023년 가을, 팀원 4명과 밤 11시까지 도서관에서 회의하던 중이었습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 시간, 장소, 상황의 디테일',
            diagnosis: '즉석자가진단: "그때 정확히 뭐했어요?"라고 물으면 상세 설명 가능한가?',
            helpQuestions: [
              '정확한 시기는? (계절, 시간대)',
              '어디에 있었나요?',
              '누구와 함께였나요?',
              '주변 분위기는 어땠나요?',
            ],
            ifDifficult: '그때 찍은 사진이나 메모를 찾아보세요. SNS나 일기에 기록이 있는지 확인해보세요.',
            ifStillDifficult: '계절이나 학기 정도라도 기억해보세요. "여름방학 중", "2학기 중간고사 기간" 등도 도움이 됩니다.',
            example: '2023년 가을, 팀원 4명과 밤 11시까지 도서관에서 회의하던 중이었습니다. 스타트업 마케팅 전략을 분석하면서...',
          },
        },
        {
          id: 'q1_3_2',
          label: 'Q1.3.2. 그때 어떤 감정이나 생각이 들었나요?',
          hint: '내면의 변화와 깨달음',
          placeholder: '예: "이런 일을 매일 한다면 정말 행복하겠다"는 생각이 들었고, 처음으로 제 진로가 명확해지는 느낌이었습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 내면의 변화와 깨달음',
            diagnosis: '즉석자가진단: "정확히 어떤 느낌이었어요?"라고 물으면 감정 표현 가능한가?',
            helpQuestions: [
              '어떤 감정이 들었나요?',
              '어떤 생각이 머리를 스쳤나요?',
              '그 순간이 왜 특별했나요?',
            ],
            ifDifficult: '긍정적인 감정(설렘, 흥분, 확신)이든 부정적인 감정(긴장, 두려움)이든 솔직하게 표현하세요.',
            ifStillDifficult: '"재미있었다", "더 알고 싶었다", "잘할 수 있을 것 같았다" 같은 단순한 느낌도 좋습니다.',
            example: '"이런 일을 매일 한다면 정말 행복하겠다"는 생각이 들었고, 처음으로 제 진로가 명확해지는 느낌이었습니다.',
          },
        },
        {
          id: 'q1_3_3',
          label: 'Q1.3.3. 이 경험이 나의 어떤 가치관과 연결되나요?',
          hint: '개인의 신념이나 추구하는 가치',
          placeholder: '예: 저는 늘 "데이터는 거짓말하지 않는다"고 믿어왔고, 숫자로 문제를 해결하는 것을 좋아합니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 개인의 신념이나 추구하는 가치',
            diagnosis: '즉석자가진단: "왜 그게 당신에게 중요해요?"라고 물으면 설명 가능한가?',
            helpQuestions: [
              '평소 중요하게 생각하는 가치는?',
              '일할 때 가장 중요한 것은?',
              '이 경험이 그 가치와 어떻게 연결되나요?',
            ],
            ifDifficult: '과거에 뿌듯했던 경험들의 공통점을 찾아보세요.',
            ifStillDifficult: '"문제 해결", "창의성", "소통", "성장" 같은 일반적인 가치도 구체적인 사례와 연결하면 좋습니다.',
            example: '저는 늘 "데이터는 거짓말하지 않는다"고 믿어왔고, 숫자로 문제를 해결하는 것을 좋아합니다. 이 경험에서도 데이터 분석이 실제 성과로 이어지는 것을 보며...',
          },
        },
      ],
    },
    {
      id: 4,
      title: 'STEP 4: 준비 과정',
      subtitle: '관심을 역량으로 발전시킨 과정',
      questions: [
        {
          id: 'q1_4_1',
          label: 'Q1.4.1. 관심이 생긴 후 이 직무를 향한 발전 과정은?',
          hint: '시간 순서대로 역량 발전 스토리',
          placeholder: '예: 처음에는 독서로 시작했고, 3개월 후 동아리 활동, 6개월 후 개인 프로젝트로 이어졌습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 시간 순서대로 역량 발전 스토리',
            diagnosis: '즉석자가진단: "단계별로 뭘 했어요?"라고 물으면 순서대로 설명 가능한가?',
            helpQuestions: [
              '처음에는 무엇부터 시작했나요?',
              '그 다음에는 어떤 활동을 했나요?',
              '가장 최근에는 무엇을 했나요?',
            ],
            ifDifficult: '시간순으로 정리해보세요: 1단계(입문), 2단계(학습), 3단계(실습), 4단계(심화)',
            ifStillDifficult: '큰 활동 3개만 시간순으로 나열해도 충분합니다.',
            example: '처음에는 독서로 시작했고, 3개월 후 동아리 활동, 6개월 후 개인 프로젝트로 이어졌습니다. 최근에는 공모전에 도전하고 있습니다.',
          },
        },
        {
          id: 'q1_4_2',
          label: 'Q1.4.2. 가장 많은 시간과 노력을 투자한 구체적 준비는?',
          hint: '가장 열심히 한 활동과 그 성과',
          placeholder: '예: 6개월간 매주 2개씩 브랜드 분석 글을 작성했고, 총 50개 기업을 분석하며 누적 조회수 1만을 달성했습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 가장 열심히 한 활동과 그 성과',
            diagnosis: '즉석자가진단: "왜 그걸 선택했어요?"라고 물으면 이유 설명 가능한가?',
            helpQuestions: [
              '가장 시간을 많이 쓴 활동은?',
              '왜 그것에 집중했나요?',
              '어떤 성과가 나왔나요?',
            ],
            ifDifficult: '주간/월간 단위로 정기적으로 한 활동을 떠올려보세요.',
            ifStillDifficult: '시간 투자량으로 표현하세요. "매일 2시간씩", "주 3회" 등',
            example: '6개월간 매주 2개씩 브랜드 분석 글을 작성했고, 총 50개 기업을 분석하며 누적 조회수 1만을 달성했습니다.',
          },
        },
        {
          id: 'q1_4_3',
          label: 'Q1.4.3. 이 준비 과정에서 얻은 가장 중요한 배움이나 깨달음은?',
          hint: '실패와 성공을 통한 성장',
          placeholder: '예: 초반에는 트렌드만 쫓다가 실패했지만, 브랜드 본질을 이해하는 것이 더 중요하다는 것을 깨달았습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 실패와 성공을 통한 성장',
            diagnosis: '즉석자가진단: "그게 지금 당신에게 어떤 영향을 주나요?"라고 물으면 연결 가능한가?',
            helpQuestions: [
              '가장 큰 실패는 무엇이었나요?',
              '그것에서 무엇을 배웠나요?',
              '그 배움이 지금 어떻게 적용되나요?',
            ],
            ifDifficult: '잘 안 됐던 경험에서의 교훈을 떠올려보세요.',
            ifStillDifficult: '작은 깨달음도 의미 있습니다. "꾸준함의 중요성", "기초의 중요성" 등',
            example: '초반에는 트렌드만 쫓다가 실패했지만, 브랜드 본질을 이해하는 것이 더 중요하다는 것을 깨달았습니다. 이후 분석 방식을 완전히 바꿨고...',
          },
        },
      ],
    },
    {
      id: 5,
      title: 'STEP 5: 회사 발견',
      subtitle: '왜 하필 이 회사인가',
      questions: [
        {
          id: 'q1_5_1',
          label: 'Q1.5.1. 이 회사를 어떻게 알게 되었나요?',
          hint: '회사를 발견한 구체적 경로',
          placeholder: '예: 마케팅 컨퍼런스에서 OOO 마케팅 팀장님의 발표를 듣고 감명받았습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 회사를 발견한 구체적 경로',
            diagnosis: '즉석자가진단: "처음 들었을 때 어떤 인상이었어요?"라고 물으면 답변 가능한가?',
            helpQuestions: [
              '언제 처음 알게 되었나요?',
              '어떤 경로였나요? (채용 사이트, 추천, 행사)',
              '첫 인상은 어땠나요?',
            ],
            ifDifficult: '채용공고, 지인 추천, 뉴스, SNS 등 어떤 경로든 솔직하게 쓰세요.',
            ifStillDifficult: '"업계 선도 기업이라는 평판을 듣고", "채용 설명회에서" 등도 좋습니다.',
            example: '마케팅 컨퍼런스에서 OOO 마케팅 팀장님의 발표를 듣고 감명받았습니다. 데이터 기반 의사결정 사례가 인상적이었고...',
          },
        },
        {
          id: 'q1_5_2',
          label: 'Q1.5.2. 처음 이 회사를 알았을 때 어떤 인상을 받았나요?',
          hint: '첫 인상과 끌린 이유',
          placeholder: '예: "여기는 진짜 데이터로 의사결정하는 회사구나"라는 확신이 들었습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 첫 인상과 끌린 이유',
            diagnosis: '즉석자가진단: "왜 그런 인상을 받았어요?"라고 물으면 이유 설명 가능한가?',
            helpQuestions: [
              '어떤 점이 인상적이었나요?',
              '다른 회사와 다르다고 느낀 점은?',
              '왜 더 알고 싶어졌나요?',
            ],
            ifDifficult: '회사 소개 자료나 홈페이지에서 느낀 점을 떠올려보세요.',
            ifStillDifficult: '"혁신적이다", "성장 가능성이 크다" 같은 일반적 인상도 구체적 근거와 함께라면 좋습니다.',
            example: '"여기는 진짜 데이터로 의사결정하는 회사구나"라는 확신이 들었습니다. 발표 내용 전체가 숫자와 분석으로 가득했고...',
          },
        },
        {
          id: 'q1_5_3',
          label: 'Q1.5.3. 다른 회사와 비교했을 때 이 회사만의 특별한 점은?',
          hint: '차별화된 강점과 매력 포인트',
          placeholder: '예: 다른 회사들은 마케팅을 비용으로 보지만, OOO는 투자로 보고 과감한 실험을 장려한다는 점이 인상적이었습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 차별화된 강점과 매력 포인트',
            diagnosis: '즉석자가진단: "경쟁사는 왜 안 되나요?"라고 물으면 차별점 설명 가능한가?',
            helpQuestions: [
              '경쟁사 대비 차별점은?',
              '이 회사만의 독특한 문화는?',
              '나에게 특히 맞는 이유는?',
            ],
            ifDifficult: '회사의 핵심 가치, 대표 제품/서비스, 업계 포지션 등을 비교해보세요.',
            ifStillDifficult: '업계 1위, 최초, 유일 등의 객관적 차별점도 좋습니다.',
            example: '다른 회사들은 마케팅을 비용으로 보지만, OOO는 투자로 보고 과감한 실험을 장려한다는 점이 인상적이었습니다.',
          },
        },
      ],
    },
    {
      id: 6,
      title: 'STEP 6: 역량 및 기여',
      subtitle: '내가 기여할 수 있는 것',
      questions: [
        {
          id: 'q1_6_1',
          label: 'Q1.6.1. 입사 후 내가 기여할 수 있는 구체적 역량은?',
          hint: '보유 역량과 증명 가능한 경험',
          placeholder: '예: MZ세대 트렌드 분석과 SNS 콘텐츠 기획 역량으로 2030 고객 확보에 기여하겠습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 보유 역량과 증명 가능한 경험',
            diagnosis: '즉석자가진단: "그걸 어떻게 증명할 수 있어요?"라고 물으면 근거 제시 가능한가?',
            helpQuestions: [
              '내가 잘하는 것은?',
              '그것을 보여주는 경험은?',
              '회사에 어떻게 도움이 될까요?',
            ],
            ifDifficult: 'STEP 2에서 작성한 강점과 STEP 4의 준비 내용을 연결하세요.',
            ifStillDifficult: '작은 기여도 의미 있습니다. "신선한 시각", "열정", "빠른 학습력" 등도 역량입니다.',
            example: 'MZ세대 트렌드 분석과 SNS 콘텐츠 기획 역량으로 2030 고객 확보에 기여하겠습니다. 실제로 인스타그램 계정을 3개월 만에...',
          },
        },
        {
          id: 'q1_6_2',
          label: 'Q1.6.2. 그 역량을 보여주는 가장 강력한 경험은?',
          hint: '구체적 프로젝트나 성과',
          placeholder: '예: 인스타그램 계정을 운영하며 3개월 만에 팔로워 1,500명을 모았고, 협찬 제안을 5건 받았습니다...',
          rows: 3,
          guide: {
            description: '답변 가이드: 구체적 프로젝트나 성과',
            diagnosis: '즉석자가진단: "그 성과를 어떻게 만들었어요?"라고 물으면 과정 설명 가능한가?',
            helpQuestions: [
              '가장 자랑스러운 성과는?',
              '수치로 표현할 수 있나요?',
              '어떤 과정을 거쳤나요?',
            ],
            ifDifficult: 'STEP 4의 준비 과정에서 가장 큰 성과를 선택하세요.',
            ifStillDifficult: '작은 수치라도 구체적으로 쓰세요. "10명 앞에서 발표", "5페이지 리포트 작성" 등',
            example: '인스타그램 계정을 운영하며 3개월 만에 팔로워 1,500명을 모았고, 협찬 제안을 5건 받았습니다. 특히 참여율 8%는 업계 평균의 2배입니다.',
          },
        },
      ],
    },
  ];

  const round2Questions = {
    1: [
      {
        id: 'q2_1_1',
        label: 'Q2.1.1. Q1.1.1(이 분야에 처음 관심을 갖게 된 구체적인 계기는 무엇인가요?)의 계기를 더 구체적으로 묘사해주세요',
        hint: '그 순간의 디테일한 상황과 감정을 생생하게 표현',
        guide: {
          description: '답변 가이드: 그 순간의 디테일한 상황과 감정을 생생하게 표현',
          diagnosis: '즉석자가진단: "그때 무슨 생각이 들었어요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '그날의 날씨, 분위기, 주변 상황은?',
            '함께 있던 사람들의 반응은?',
            '그 순간 들었던 구체적인 생각은?',
          ],
          ifDifficult: '그때 찍은 사진이나 메모를 찾아보세요. SNS나 일기에 기록이 있는지 확인해보거나 함께했던 사람에게 물어보세요.',
          ifStillDifficult: '계절이라도 기억해보세요. "여름이었고 더웠다", "기말고사 직후였다" 같은 시기적 배경이라도 추가하면 진정성이 높아집니다.',
          example: '2023년 3월 봄비가 내리던 날, 전공 수업 발표를 준비하면서였습니다. 팀원들과 밤늦게까지 도서관에서 회의하던 중, 스타트업 마케팅 전략을 분석하다가 \'이런 일을 직업으로 하면 정말 재미있겠다\'는 생각이 들었습니다.',
        },
        placeholder: '예: 2023년 3월 봄비가 내리던 날...',
        rows: 4,
      },
      {
        id: 'q2_1_2',
        label: 'Q2.1.2. 그 계기 이전과 이후, 당신은 어떻게 달라졌나요?',
        hint: '변화의 구체적인 before & after 비교',
        guide: {
          description: '답변 가이드: 변화의 구체적인 before & after 비교',
          diagnosis: '즉석자가진단: "구체적으로 뭐가 달라졌어요?"라고 물으면 3가지 이상 답변 가능한가?',
          helpQuestions: [
            '일상의 관심사가 어떻게 바뀌었나요?',
            '시간을 쓰는 방식이 어떻게 변했나요?',
            '미래 계획이 어떻게 수정되었나요?',
          ],
          ifDifficult: 'SNS 피드나 유튜브 알고리즀이 어떻게 바뀌었는지 생각해보세요.',
          ifStillDifficult: '최소한 검색 기록이 바뀌었을 것입니다. 작은 변화라도 구체적으로 적어보세요.',
          example: '이전에는 넷플릭스를 보며 시간을 보냈지만, 이후에는 매일 2시간씩 마케팅 관련 콘텐츠를 소비하기 시작했습니다.',
        },
        placeholder: '예: 이전에는 넷플릭스를...',
        rows: 4,
      },
      {
        id: 'q2_1_3',
        label: 'Q2.1.3. 만약 그 계기가 없었다면 지금 무엇을 하고 있을까요?',
        hint: '계기의 결정적 중요성을 역설적으로 강조',
        guide: {
          description: '답변 가이드: 계기의 결정적 중요성을 역설적으로 강조',
          diagnosis: '즉석자가진단: "다른 진로를 생각해본 적 있어요?"라고 물으면 답변 가능한가?',
          helpQuestions: [
            '다른 진로를 고려했었나요?',
            '그 계기가 왜 결정적이었나요?',
            '다른 가능성과 비교했을 때 이 길을 선택한 이유는?',
          ],
          ifDifficult: '이전에 막연히 생각했던 진로를 떠올려보세요.',
          ifStillDifficult: '주변 친구들이 선택한 일반적인 진로를 생각해보세요.',
          example: '아마 전공을 살려 일반 사무직을 준비했을 것입니다.',
        },
        placeholder: '예: 아마 전공을 살려...',
        rows: 4,
      },
    ],
    2: [
      {
        id: 'q2_2_1',
        label: 'Q2.2.1. Q1.2.1(관심을 이어가기 위해 구체적으로 어떤 활동을 했나요?)의 활동 중 가장 도전적이었던 것을 자세히 설명해주세요',
        hint: '어려움과 극복 과정을 구체적으로 서술',
        guide: {
          description: '답변 가이드: 어려움과 극복 과정을 구체적으로 서술',
          diagnosis: '즉석자가진단: "왜 그게 어려웠어요?"라고 물으면 상세 설명 가능한가?',
          helpQuestions: [
            '어떤 점이 가장 어려웠나요?',
            '포기하고 싶었던 순간은?',
            '어떻게 극복했나요?',
          ],
          ifDifficult: '실패했던 경험도 의미가 있습니다.',
          ifStillDifficult: '처음 해본 것은 모두 도전입니다.',
          example: '가장 어려웠던 건 인스타그램 계정 운영이었습니다.',
        },
        placeholder: '예: 가장 어려웠던 건...',
        rows: 4,
      },
      {
        id: 'q2_2_2',
        label: 'Q2.2.2. 그 활동을 통해 얻은 구체적인 결과물은 무엇인가요?',
        hint: '측정 가능하고 검증 가능한 구체적 성과',
        guide: {
          description: '답변 가이드: 측정 가능하고 검증 가능한 구체적 성과',
          diagnosis: '즉석자가진단: "그 성과를 어떻게 증명할 수 있어요?"',
          helpQuestions: [
            '만든 포트폴리오나 프로젝트가 있나요?',
            '받은 인정이나 피드백은?',
            '수치로 표현할 수 있는 성과는?',
          ],
          ifDifficult: '작은 성과도 의미가 있습니다.',
          ifStillDifficult: '학습 기록이나 노트도 결과물입니다.',
          example: '6개월간의 탐구로 구체적인 결과물을 만들었습니다.',
        },
        placeholder: '예: 6개월간의 탐구로...',
        rows: 4,
      },
      {
        id: 'q2_2_3',
        label: 'Q2.2.3. 이 과정에서 실패하거나 시행착오를 겪은 경험은?',
        hint: '실패와 극복이 성장의 증거',
        guide: {
          description: '답변 가이드: 실패와 극복이 성장의 증거',
          diagnosis: '즉석자가진단: "그 실패에서 뭘 배웠어요?"',
          helpQuestions: [
            '예상과 다르게 진행된 부분은?',
            '실패의 원인은 무엇이었나요?',
            '그 실패를 어떻게 극복했나요?',
          ],
          ifDifficult: '모든 새로운 도전에는 시행착오가 따릅니다.',
          ifStillDifficult: '작은 실수도 의미가 있습니다.',
          example: '초반에는 무작정 트렌드만 따라 했다가 실패했습니다.',
        },
        placeholder: '예: 초반에는...',
        rows: 4,
      },
    ],
    3: [
      {
        id: 'q2_3_1',
        label: 'Q2.3.1. 이 직무의 하루 일과를 상상해서 설명해주세요',
        hint: '현실적이고 구체적인 업무 일과 묘사',
        guide: {
          description: '답변 가이드: 현실적이고 구체적인 업무 일과 묘사',
          diagnosis: '즉석자가진단: "그 중 가장 어려운 업무는 뭘까요?"',
          helpQuestions: [
            '오전에는 주로 무슨 업무를?',
            '협업은 누구와 어떻게?',
            '가장 시간이 많이 걸리는 업무는?',
          ],
          ifDifficult: '현직자 인터뷰나 브런치 글을 참고하세요.',
          ifStillDifficult: '일반적인 업무 흐름이라도 구체화하세요.',
          example: '오전 9시, 전날 캠페인 성과를 확인하며 하루를 시작합니다.',
        },
        placeholder: '예: 오전 9시...',
        rows: 4,
      },
      {
        id: 'q2_3_2',
        label: 'Q2.3.2. 이 직무에 필요한 핵심 역량 3가지와 본인의 수준은?',
        hint: '객관적 자기 평가와 발전 가능성',
        guide: {
          description: '답변 가이드: 객관적 자기 평가와 발전 가능성',
          diagnosis: '즉석자가진단: "그 역량을 어떻게 키울 건가요?"',
          helpQuestions: [
            '필수 역량 top 3는?',
            '각각의 현재 수준은?',
            '부족한 부분을 어떻게 채울 것인가?',
          ],
          ifDifficult: '채용공고나 직무 소개서를 참고하세요.',
          ifStillDifficult: '일반적인 역량이라도 솔직하게 평가하세요.',
          example: '핵심 역량 3가지는 데이터 분석, 크리에이티브, 트렌드 감각입니다.',
        },
        placeholder: '예: 핵심 역량 3가지는...',
        rows: 4,
      },
      {
        id: 'q2_3_3',
        label: 'Q2.3.3. 부족한 역량을 채우기 위한 구체적 계획은?',
        hint: '우선순위가 명확하고 실행 가능한 계획',
        guide: {
          description: '답변 가이드: 우선순위가 명확하고 실행 가능한 계획',
          diagnosis: '즉석자가진단: "이번 달에는 뭘 하실 건가요?"',
          helpQuestions: [
            '우선순위를 정한다면?',
            '각각 언제까지, 어떻게?',
            '이미 시작한 것이 있다면?',
          ],
          ifDifficult: '온라인 강의, 자격증, 독서, 스터디 등을 떠올려보세요.',
          ifStillDifficult: '입사 후 배울 수 있는 것과 지금 준비할 수 있는 것을 구분하세요.',
          example: '우선 데이터 분석 역량 강화를 위해 현재 SQL 강의를 수강 중입니다.',
        },
        placeholder: '예: 우선 데이터 분석...',
        rows: 4,
      },
    ],
    4: [
      {
        id: 'q2_4_1',
        label: 'Q2.4.1. 이 회사의 최근 1년 주요 뉴스나 변화는?',
        hint: '구체적인 사실과 날짜, 내용 포함',
        guide: {
          description: '답변 가이드: 구체적인 사실과 날짜, 내용 포함',
          diagnosis: '즉석자가진단: "그게 왜 중요한가요?"',
          helpQuestions: [
            '신규 서비스나 사업 확장은?',
            '조직 문화나 제도의 변화는?',
            '업계에서의 포지션 변화는?',
          ],
          ifDifficult: '회사 홈페이지 뉴스룸을 확인하세요.',
          ifStillDifficult: '기본적인 회사 정보라도 구체화하세요.',
          example: '지난 2024년 11월, OOO는 동남아 시장 진출을 공식 발표했습니다.',
        },
        placeholder: '예: 지난 2024년 11월, OOO는 동남아 시장 진출을 공식 발표했습니다...',
        rows: 4,
      },
      {
        id: 'q2_4_2',
        label: 'Q2.4.2. 이 회사만의 독특한 문화나 가치는 무엇인가요?',
        hint: '다른 회사와 차별화되는 점',
        guide: {
          description: '답변 가이드: 다른 회사와 차별화되는 점',
          diagnosis: '즉석자가진단: "왜 그게 당신에게 중요해요?"',
          helpQuestions: [
            '회사의 핵심 가치는?',
            '업무 방식의 특징은?',
            '조직 문화의 차별점은?',
          ],
          ifDifficult: '회사 홈페이지의 "About Us"를 확인하세요.',
          ifStillDifficult: '일반적인 키워드라도 회사와 연결하세요.',
          example: 'OOO는 "빠른 실행과 지속적 개선"을 핵심 가치로 삼고 있습니다.',
        },
        placeholder: '예: OOO는 "빠른 실행과 지속적 개선"을 핵심 가치로 삼고 있습니다...',
        rows: 4,
      },
      {
        id: 'q2_4_3',
        label: 'Q2.4.3. 이 회사가 직면한 도전 과제와 기회는?',
        hint: '산업 트렌드와 연결한 통찰력 있는 분석',
        guide: {
          description: '답변 가이드: 산업 트렌드와 연결한 통찰력 있는 분석',
          diagnosis: '즉석자가진단: "당신이 어떻게 기여할 수 있을까요?"',
          helpQuestions: [
            '현재 가장 집중하는 이슈는?',
            '향후 성장 동력은?',
            '내가 기여할 수 있는 부분은?',
          ],
          ifDifficult: '산업 리포트, CEO 인터뷰를 찾아보세요.',
          ifStillDifficult: '일반적인 산업 트렌드라도 회사와 연결하세요.',
          example: '가장 큰 도전은 MZ세대 고객 확보입니다.',
        },
        placeholder: '예: 가장 큰 도전은...',
        rows: 4,
      },
    ],
    5: [
      {
        id: 'q2_5_1',
        label: 'Q2.5.1. 입사 후 기여 방안을 프로젝트 단위로 설명해주세요',
        hint: '구체적인 프로젝트 아이디어와 실행 계획',
        guide: {
          description: '답변 가이드: 구체적인 프로젝트 아이디어와 실행 계획',
          diagnosis: '즉석자가진단: "필요한 리소스는 뭐예요?"',
          helpQuestions: [
            '구체적인 프로젝트명은?',
            '필요한 리소스와 기간은?',
            '예상되는 성과 지표는?',
          ],
          ifDifficult: '현재 회사가 진행 중인 프로젝트를 참고하세요.',
          ifStillDifficult: '간단한 프로젝트부터 시작하세요.',
          example: '첫 3개월: MZ세대 타겟 SNS 캠페인 기획',
        },
        placeholder: '예: 첫 3개월...',
        rows: 4,
      },
      {
        id: 'q2_5_2',
        label: 'Q2.5.2. 입사 첫 6개월 동안의 구체적인 목표는?',
        hint: '시간 순서에 따른 단계별 계획',
        guide: {
          description: '답변 가이드: 시간 순서에 따른 단계별 계획',
          diagnosis: '즉석자가진단: "그게 현실적인가요?"',
          helpQuestions: [
            '첫 달: 적응 및 학습',
            '2-3달: 실무 참여',
            '4-6달: 독자적 기여',
          ],
          ifDifficult: '신입사원의 일반적인 성장 경로를 참고하세요.',
          ifStillDifficult: '단계별로 나눠 생각하세요.',
          example: '첫 달은 팀의 업무 방식을 익히며...',
        },
        placeholder: '예: 첫 달은...',
        rows: 4,
      },
      {
        id: 'q2_5_3',
        label: 'Q2.5.3. 이 회사 특유의 상황에서 어떻게 적응할 건가요?',
        hint: '회사 문화와 업무 방식에 대한 구체적 적응 전략',
        guide: {
          description: '답변 가이드: 회사 문화와 업무 방식에 대한 구체적 적응 전략',
          diagnosis: '즉석자가진단: "첫 주에 뭘 할 건가요?"',
          helpQuestions: [
            '빠른 의사결정 문화에 적응하려면?',
            '글로벌 협업이 필요하다면?',
            '애자일한 조직 문화에서는?',
          ],
          ifDifficult: '회사의 특징적인 문화를 하나 선택해서 적응 방법을 설명하세요.',
          ifStillDifficult: '일반적인 적응 전략이라도 구체화하세요.',
          example: 'OOO의 \'애자일 업무 방식\'에 빠르게 적응하기 위해...',
        },
        placeholder: '예: 귀사의...',
        rows: 4,
      },
    ],
    6: [
      {
        id: 'q2_6_1',
        label: 'Q2.6.1. 롤모델이 있다면 누구이고, 왜인가요?',
        hint: '구체적인 인물과 닮고 싶은 점 명확히',
        guide: {
          description: '답변 가이드: 구체적인 인물과 닮고 싶은 점 명확히',
          diagnosis: '즉석자가진단: "그 사람의 어떤 점을 닮고 싶어요?"',
          helpQuestions: [
            '그 사람의 어떤 점을 닮고 싶나요?',
            '그 사람의 커리어 경로는?',
            '나만의 차별점은?',
          ],
          ifDifficult: '업계 유명 인사를 찾아보세요.',
          ifStillDifficult: '유명하지 않아도 괜찮습니다.',
          example: '\'마케터의 일\' 저자 장인성 님을 롤모델로...',
        },
        placeholder: '예: 저자 장인성 님을...',
        rows: 4,
      },
      {
        id: 'q2_6_2',
        label: 'Q2.6.2. 이 분야에서 나만의 전문성을 어떻게 만들 건가요?',
        hint: '차별화된 전문 영역과 구체적 계획',
        guide: {
          description: '답변 가이드: 차별화된 전문 영역과 구체적 계획',
          diagnosis: '즉석자가진단: "왜 그 분야인가요?"',
          helpQuestions: [
            '어떤 세부 분야에 집중할 건가요?',
            '차별화 포인트는?',
            '그를 위한 준비는?',
          ],
          ifDifficult: '현재 트렌드와 자신의 강점을 결합하세요.',
          ifStillDifficult: '기본에 충실하되 한 가지를 깊게 파는 전략도 좋습니다.',
          example: '\'데이터 기반 그로스 마케팅\' 전문가가 되고자 합니다.',
        },
        placeholder: '예: 데이터 기반...',
        rows: 4,
      },
    ],
  };

  const round3Questions = [
    {
      id: 'connect_1_2',
      label: '연결 확인 1→2: 관심 계기에서 탐구 과정으로',
      hint: 'STEP 1의 첫 관심이 STEP 2의 활동으로 어떻게 이어졌나요?',
      placeholder: '예: 그 경험 이후 마케팅에 대한 호기심을 실제 공부로 발전시키고자...',
      rows: 3,
      referenceSteps: [1, 2],
      referenceQuestions: ['q1_1_1', 'q1_1_2', 'q1_1_3', 'q1_2_1'],
    },
    {
      id: 'connect_2_3',
      label: '연결 확인 2→3: 탐구 과정에서 전문성 이해로',
      hint: 'STEP 2의 활동을 통해 STEP 3의 전문성 이해가 어떻게 깊어졌나요?',
      placeholder: '예: 이러한 탐구를 통해 단순한 흥미를 넘어 이 직무의 본질을 이해하게 되었습니다...',
      rows: 3,
      referenceSteps: [2, 3],
      referenceQuestions: ['q1_2_1', 'q1_2_2', 'q1_3_1', 'q1_3_2'],
    },
    {
      id: 'connect_3_4',
      label: '연결 확인 3→4: 전문성 이해에서 준비 과정으로',
      hint: 'STEP 3의 이해가 STEP 4의 준비로 어떻게 전환되었나요?',
      placeholder: '예: 이러한 관심은 단순한 호기심에 그치지 않고, 실제 역량을 키우기 위한 구체적인 준비로 이어졌습니다...',
      rows: 3,
      referenceSteps: [3, 4],
      referenceQuestions: ['q1_3_2', 'q1_3_3', 'q1_4_1', 'q1_4_2'],
    },
    {
      id: 'connect_4_5',
      label: '연결 확인 4→5: 준비 과정에서 회사 선택으로',
      hint: 'STEP 4의 준비 과정이 STEP 5의 회사 선택에 어떤 영향을 주었나요?',
      placeholder: '예: 이러한 준비 과정을 통해 제가 원하는 일의 방향이 명확해졌고...',
      rows: 3,
      referenceSteps: [4, 5],
      referenceQuestions: ['q1_4_1', 'q1_4_3', 'q1_5_1', 'q1_5_3'],
    },
    {
      id: 'connect_5_6',
      label: '연결 확인 5→6: 회사 선택에서 기여 방안으로',
      hint: 'STEP 5의 회사 특성이 STEP 6의 기여 계획에 어떻게 반영되었나요?',
      placeholder: '예: OOO의 이러한 문화와 방향성 속에서 제가 준비한 역량을 발휘하여...',
      rows: 3,
      referenceSteps: [5, 6],
      referenceQuestions: ['q1_5_2', 'q1_5_3', 'q1_6_1', 'q1_6_2'],
    },
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleBasicInfoChange = (field, value) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
  };

  const toggleGuide = (questionId) => {
    setShowGuide((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const toggleStepSelection = (stepId) => {
    setSelectedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    );
  };

  const goToNextStep = () => {
    if (currentPhase === 'round1') {
      if (currentStep < round1Steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentPhase('evaluation');
      }
    } else if (currentPhase === 'evaluation') {
      const sortedSteps = [...selectedSteps].sort((a, b) => a - b);
      setSelectedSteps(sortedSteps);
      setCurrentPhase('round2');
      setCurrentStep(0);
    } else if (currentPhase === 'round2') {
      if (currentStep < selectedSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentPhase('round3');
        setCurrentStep(0);
      }
    } else if (currentPhase === 'round3') {
      if (currentStep < round3Questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setFinalText(generateMotivationLetter());
        setCurrentPhase('completed');
      }
    }
  };

  const goToPrevStep = () => {
    if (currentPhase === 'completed') {
      setCurrentPhase('round3');
      setCurrentStep(round3Questions.length - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentPhase === 'round3') {
      setCurrentPhase('round2');
      setCurrentStep(selectedSteps.length - 1);
    } else if (currentPhase === 'round2') {
      setCurrentPhase('evaluation');
    } else if (currentPhase === 'round1' && currentStep === 0) {
      setShowIntro(true);
    }
  };

  const generateMotivationLetter = () => {
    const parts = [];

    if (answers.q1_2_4) parts.push(answers.q1_2_4);
    if (answers.q1_1_1) parts.push('\n' + answers.q1_1_1);
    if (answers.q1_1_2) parts.push(answers.q1_1_2);
    if (answers.q1_1_3) parts.push(answers.q1_1_3);
    if (answers.q1_3_1) parts.push('\n' + answers.q1_3_1);
    if (answers.q1_3_2) parts.push(answers.q1_3_2);
    if (answers.q1_3_3) parts.push(answers.q1_3_3);
    if (answers.connect_1_2) parts.push('\n' + answers.connect_1_2);
    if (answers.q1_4_1) parts.push('\n' + answers.q1_4_1);
    if (answers.q1_4_2) parts.push(answers.q1_4_2);
    if (answers.q1_4_3) parts.push(answers.q1_4_3);
    if (answers.connect_2_3) parts.push('\n' + answers.connect_2_3);
    if (answers.q1_2_2) parts.push('\n' + answers.q1_2_2);
    if (answers.connect_3_4) parts.push('\n' + answers.connect_3_4);
    if (answers.q1_5_1) parts.push('\n' + answers.q1_5_1);
    if (answers.q1_5_2) parts.push(answers.q1_5_2);
    if (answers.q1_5_3) parts.push(answers.q1_5_3);
    if (answers.q1_2_3) parts.push(answers.q1_2_3);
    if (answers.connect_4_5) parts.push('\n' + answers.connect_4_5);
    if (answers.q1_6_1) parts.push('\n' + answers.q1_6_1);
    if (answers.q1_6_2) parts.push(answers.q1_6_2);
    if (answers.connect_5_6) parts.push('\n' + answers.connect_5_6);

    return parts.join('\n\n');
  };

  const downloadFinalText = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>지원동기</title>
<style>
body { font-family: '맑은 고딕', 'Malgun Gothic', sans-serif; line-height: 1.8; padding: 40px; }
p { margin-bottom: 1em; }
</style>
</head>
<body>
${finalText.split('\n\n').map((para) => `<p>${para.replace(/\n/g, '<br>')}</p>`).join('\n')}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${basicInfo.company || '회사'}_지원동기.doc`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 5000);
  };

  const getRawAnswersText = () => {
    return `📋 원본 답변 모음\n\n[기본 정보]\n산업: ${basicInfo.industry || '-'}\n직무: ${basicInfo.position || '-'}\n회사: ${basicInfo.company || '-'}\n\n[STEP 1: 관심 계기]\nQ1.1.1: ${answers.q1_1_1 || '-'}\nQ1.1.2: ${answers.q1_1_2 || '-'}\nQ1.1.3: ${answers.q1_1_3 || '-'}\n\n[STEP 2: 핵심 메시지]\nQ1.2.1: ${answers.q1_2_1 || '-'}\nQ1.2.2: ${answers.q1_2_2 || '-'}\nQ1.2.3: ${answers.q1_2_3 || '-'}\nQ1.2.4: ${answers.q1_2_4 || '-'}\n\n[STEP 3: 관심 계기 구체화]\nQ1.3.1: ${answers.q1_3_1 || '-'}\nQ1.3.2: ${answers.q1_3_2 || '-'}\nQ1.3.3: ${answers.q1_3_3 || '-'}\n\n[STEP 4: 준비 과정]\nQ1.4.1: ${answers.q1_4_1 || '-'}\nQ1.4.2: ${answers.q1_4_2 || '-'}\nQ1.4.3: ${answers.q1_4_3 || '-'}\n\n[STEP 5: 회사 발견]\nQ1.5.1: ${answers.q1_5_1 || '-'}\nQ1.5.2: ${answers.q1_5_2 || '-'}\nQ1.5.3: ${answers.q1_5_3 || '-'}\n\n[STEP 6: 역량 및 기여]\nQ1.6.1: ${answers.q1_6_1 || '-'}\nQ1.6.2: ${answers.q1_6_2 || '-'}\n\n[3라운드 연결]\n1→2: ${answers.connect_1_2 || '-'}\n2→3: ${answers.connect_2_3 || '-'}\n3→4: ${answers.connect_3_4 || '-'}\n4→5: ${answers.connect_4_5 || '-'}\n5→6: ${answers.connect_5_6 || '-'}`;
  };

  const canGoNext = () => {
    if (currentPhase === 'evaluation') {
      return selectedSteps.length >= 1;
    }
    if (currentStep === 0 && currentPhase === 'round1') {
      return basicInfo.industry && basicInfo.position && basicInfo.company;
    }
    return true;
  };

  const progress =
    currentPhase === 'round1'
      ? ((currentStep + 1) / round1Steps.length) * 33
      : currentPhase === 'round2'
      ? 33 + ((currentStep + 1) / selectedSteps.length) * 33
      : 66 + ((currentStep + 1) / round3Questions.length) * 34;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">비공개 페이지</h1>
            <p className="text-gray-600">CareerEngineer의 지원동기 작성 워크북</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                비밀번호를 입력하세요
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="비밀번호 입력"
                autoFocus
              />
            </div>
            {showError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                비밀번호가 올바르지 않습니다.
              </div>
            )}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              접속하기
            </button>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              © 2025 CareerEngineer All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
              질문에 답하며 완성하는<br />지원동기 워크북
            </h1>
            <p className="text-center text-gray-600 mb-8">
              CareerEngineer의 3라운드 체계적 작성 시스템
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3라운드 작성 시스템</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-800 mb-2">1라운드: 기본 지원동기 수립</h3>
                  <p className="text-sm text-gray-700">6개 STEP 핵심 질문에 답변 (전체 구조 파악)</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
                  <h3 className="font-bold text-gray-800 mb-2">2라운드: 약한 부분 보강</h3>
                  <p className="text-sm text-gray-700">부족한 STEP 선택 → 심화 질문으로 구체화 (1개 이상)</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <h3 className="font-bold text-gray-800 mb-2">3라운드: 연결 및 완성</h3>
                  <p className="text-sm text-gray-700">STEP 간 연결 질문으로 자연스러운 흐름 만들기</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-3">핵심 원칙</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>진정성:</strong> 3초 자가진단 통과한 내용만
                </li>
                <li>
                  <strong>구체성:</strong> 숫자와 사실로 표현
                </li>
                <li>
                  <strong>검증 가능성:</strong> 가족도 인정할 사실만
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-yellow-300">
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  💡 3초 자가진단이란?
                </p>
                <p className="text-sm text-gray-700">
                  누군가 "정말이에요?"라고 물었을 때{' '}
                  <strong>3초 안에 자신있게 구체적인 예시나 증거를 댈 수 있는지</strong>{' '}
                  확인하는 것입니다. 만약 머뭇거리거나 애매한 답변만 나온다면, 그 내용은 진정성이
                  부족한 것입니다.
                </p>
                <p className="text-xs text-gray-600 mt-2 italic">
                  예: "데이터 분석에 관심있다" → "정말이에요?" → (머뭇거림) ❌<br />
                  예: "6개월간 매주 2개씩 브랜드 분석 글 작성" → "정말이에요?" → "네, 블로그에
                  50개 글 있어요" ✅
                </p>
              </div>
            </div>
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-red-800 mb-2">⚠️ 반드시 확인</h3>
              <p className="text-sm text-red-700">
                작성하는 내용은 자동으로 저장되지 않으며 새로고침 버튼을 누르면 그동안 작성했던
                내용은 사라집니다. 내용 작성 후 마지막 페이지에서 반드시 워드 파일(.doc)로
                다운로드 하여 작성한 내용을 보관하세요
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-800 text-center">
                  © 2025 CareerEngineer All Rights Reserved.
                </p>
                <p className="text-xs text-red-800 text-center mt-1 font-semibold">
                  이 워크북은 저작권법에 의해 보호받는 저작물입니다. 워크북의 전체 또는 일부를
                  저작권자의 사전 서면 동의 없이 무단으로 복제, 배포, 전송, 전시, 방송하거나
                  수정 및 편집하는 행위는 금지되어 있으며, 위반 시 관련 법령에 따라 법적인
                  책임을 질 수 있습니다. 오직 개인적인 용도로만 사용해야 하며, 상업적 목적의
                  사용 및 무단 배포를 엄격히 금지합니다.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowIntro(false)}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors font-bold text-lg"
            >
              1라운드 시작하기 →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'evaluation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              1라운드 완료! 🎉
            </h2>
            <p className="text-center text-gray-600 mb-8">
              부족하다고 느끼는 STEP을 선택하여 2라운드에서 심화 질문에 답변하세요
            </p>
            <div className="space-y-4 mb-8">
              {round1Steps.slice(1).map((step) => {
                const stepId = step.id;
                const isSelected = selectedSteps.includes(stepId);

                return (
                  <div
                    key={stepId}
                    className={`border-2 rounded-lg p-5 transition-all ${
                      isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-1">{step.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{step.subtitle}</p>
                        <div className="bg-gray-50 rounded p-3 text-sm text-gray-700">
                          <strong>내 답변:</strong>{' '}
                          {answers[step.questions[0].id]?.substring(0, 100) || '(답변 없음)'}
                          {answers[step.questions[0].id]?.length > 100 && '...'}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleStepSelection(stepId)}
                        className={`ml-4 px-4 py-2 rounded-lg font-semibold transition-colors ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {isSelected ? '✓ 선택됨' : '심화 선택'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>💡 선택 기준:</strong> 답변이 부족하거나 더 구체화가 필요한 STEP을 자유롭게
                선택하세요. (1개 이상)
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={goToPrevStep}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                이전
              </button>
              <button
                onClick={goToNextStep}
                disabled={!canGoNext()}
                className="flex-1 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
              >
                2라운드 시작하기 ({selectedSteps.length}개 선택됨)
              </button>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              © 2025 CareerEngineer All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">지원동기 완성! 🎉</h2>
              <p className="text-gray-600">아래 내용을 확인하고 자유롭게 수정하세요</p>
            </div>
            <div className="bg-red-100 border-2 border-red-500 rounded-lg p-5 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">⚠️</span>
                <div>
                  <p className="text-base font-bold text-red-900 mb-2">
                    반드시 다운로드하세요!
                  </p>
                  <p className="text-sm text-red-800">
                작성하신 내용은 자동 저장되지 않습니다. 새로고침 시 모든 내용이 사라지니, 반드시 아래
                버튼을 눌러 워드 파일(.doc)로 다운로드하여 보관하세요.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">최종 지원동기</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowRawAnswers(!showRawAnswers)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  {showRawAnswers ? '최종본 보기' : '원본 답변 보기'}
                </button>
                <button
                  onClick={downloadFinalText}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  워드 파일 다운로드
                </button>
              </div>
            </div>
            {downloadSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                파일이 성공적으로 다운로드되었습니다!
              </div>
            )}
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              {showRawAnswers ? (
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">{getRawAnswersText()}</pre>
              ) : (
                <div className="text-gray-700 leading-relaxed">
                  {finalText.split('\n\n').map((para, index) => (
                    <p key={index} className="mb-4">
                      {para.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>💡 수정 팁:</strong> 최종본을 복사하여 워드나 메모장에 붙여넣고, 문장을
                다듬거나 강조하고 싶은 부분을 추가로 편집하세요. 지원서 제출 전 반드시 면접관
                입장에서 읽어보며 매끄러운지 확인하세요.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={goToPrevStep}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              이전 (3라운드)
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg"
            >
              처음부터 다시 시작
            </button>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            © 2025 CareerEngineer All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {currentPhase === 'round1'
                ? `1라운드: ${round1Steps[currentStep].title}`
                : currentPhase === 'round2'
                ? `2라운드: ${round1Steps[selectedSteps[currentStep]].title}`
                : `3라운드: ${round3Questions[currentStep].label}`}
            </h2>
            <div className="text-sm text-gray-600">
              {currentPhase === 'round1'
                ? `STEP ${currentStep + 1} / ${round1Steps.length}`
                : currentPhase === 'round2'
                ? `STEP ${currentStep + 1} / ${selectedSteps.length}`
                : `질문 ${currentStep + 1} / ${round3Questions.length}`}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {currentPhase === 'round1' && (
            <p className="text-gray-600 mb-4">{round1Steps[currentStep].subtitle}</p>
          )}
        </div>

        {currentStep === 0 && currentPhase === 'round1' ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">지원 산업</label>
              <input
                type="text"
                value={basicInfo.industry}
                onChange={(e) => handleBasicInfoChange('industry', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="예: IT, 금융, 마케팅 등"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">지원 직무</label>
              <input
                type="text"
                value={basicInfo.position}
                onChange={(e) => handleBasicInfoChange('position', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="예: 데이터 분석, 브랜드 마케팅, UI/UX 디자인 등"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">지원 회사</label>
              <input
                type="text"
                value={basicInfo.company}
                onChange={(e) => handleBasicInfoChange('company', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="예: OOO 주식회사"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {(currentPhase === 'round1'
              ? round1Steps[currentStep].questions
              : currentPhase === 'round2'
              ? round2Questions[selectedSteps[currentStep]]
              : [round3Questions[currentStep]]
            ).map((question) => (
              <div key={question.id} className="bg-gray-50 rounded-lg p-5">
                <div className="flex items-start justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-700">{question.label}</label>
                  <button
                    onClick={() => toggleGuide(question.id)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    <HelpCircle className="w-5 h-5" />
                    {showGuide[question.id] ? '가이드 닫기' : '가이드 보기'}
                  </button>
                </div>
                {showGuide[question.id] && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-4 text-sm text-blue-800">
                    <p className="font-semibold mb-2">{question.guide.description}</p>
                    <p className="mb-2">{question.guide.diagnosis}</p>
                    <p className="font-semibold mb-1">도움 질문:</p>
                    <ul className="list-disc pl-5 mb-2">
                      {question.guide.helpQuestions.map((q, index) => (
                        <li key={index}>{q}</li>
                      ))}
                    </ul>
                    <p className="font-semibold mb-1">작성에 어려움이 있다면:</p>
                    <p className="mb-2">{question.guide.ifDifficult}</p>
                    <p className="font-semibold mb-1">그래도 어려운 경우:</p>
                    <p className="mb-2">{question.guide.ifStillDifficult}</p>
                    <p className="font-semibold mb-1">예시 답변:</p>
                    <p>{question.guide.example}</p>
                  </div>
                )}
                {question.referenceSteps && (
                  <div className="bg-indigo-50 rounded-lg p-4 mb-4 text-sm text-indigo-800">
                    <p className="font-semibold mb-2">참고 답변:</p>
                    {question.referenceQuestions.map((refQ, index) => (
                      <p key={index}>
                        <strong>{refQ}:</strong> {answers[refQ] || '(답변 없음)'}
                      </p>
                    ))}
                  </div>
                )}
                <textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder={question.placeholder}
                  rows={question.rows || 4}
                />
                <p className="text-sm text-gray-500 mt-2">{question.hint}</p>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-4 mt-8">
          <button
            onClick={goToPrevStep}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            이전
          </button>
          <button
            onClick={goToNextStep}
            disabled={!canGoNext()}
            className="flex-1 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
          >
            {currentPhase === 'round3' && currentStep === round3Questions.length - 1
              ? '작성 완료'
              : '다음'}
            <ChevronRight className="w-5 h-5 inline ml-2" />
          </button>
        </div>
      </div>
      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">
          © 2025 CareerEngineer All Rights Reserved.
        </p>
      </div>
    </div>
  </div>
);

export default MotivationWorkbook;