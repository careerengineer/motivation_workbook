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
    company: ''
  });

  const [answers, setAnswers] = useState({});

  const handleLogin = () => {
    if (password === 'CeJd2025!') {
      setIsAuthenticated(true);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const round1Steps = [
    { id: 0, title: '기본 정보 입력', subtitle: '지원할 산업, 직무, 회사를 입력하세요' },
    {
      id: 1,
      title: 'STEP 1: 관심 계기 발굴',
      subtitle: '이 분야에 관심을 갖게 된 구체적 계기',
      questions: [
        {
          id: 'q1_1_1',
          label: 'Q1.1.1. 이 분야에 처음 관심을 갖게 된 구체적인 계기는 무엇인가요?',
          hint: '언제, 어디서, 무엇을 통해 관심이 생겼는지 구체적으로',
          guide: {
            description: '답변 가이드: 언제, 어디서, 무엇을 통해 관심이 생겼는지 구체적으로',
            diagnosis: '즉석자가진단: 면접관이 "그때 어떤 기분이었나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '정확히 언제였나요? (학년, 학기, 년도)',
              '어떤 상황에서였나요? (수업, 동아리, 대외활동)',
              '무엇을 보고/듣고/경험했나요?',
              '그때 어떤 감정을 느꼈나요?'
            ],
            ifDifficult: '이 직무를 알게 된 첫 순간을 떠올려보세요. 관련 수업이나 책, 영상을 처음 접한 때를 생각해보세요.',
            ifStillDifficult: '주변 사람 중 이 일을 하는 사람을 만난 경험을 떠올려보세요.'
          },
          placeholder: '예: 대학교 2학년 2학기 \'마케팅원론\' 수업에서 진행한 \'스타트업 마케팅 전략 수립\' 팀 프로젝트가 계기였습니다. 실제 스타트업 대표님과 협업하여 마케팅 전략을 수립하는 과정에서...',
          rows: 4
        },
        {
          id: 'q1_1_2',
          label: 'Q1.1.2. 그 계기에서 무엇이 특별히 인상 깊었나요?',
          hint: '단순 감상이 아닌 구체적인 깨달음이나 발견',
          guide: {
            description: '답변 가이드: 단순 감상이 아닌 구체적인 깨달음이나 발견',
            diagnosis: '즉석자가진단: "왜 그게 인상 깊었어요?"라는 추가 질문에 답변 가능한가?',
            helpQuestions: [
              '어떤 부분이 새로웠나요?',
              '기존 생각과 다른 점은 무엇이었나요?',
              '어떤 가능성을 발견했나요?'
            ],
            ifDifficult: '그 경험에서 배운 핵심 교훈이 무엇이었는지 생각해보세요.',
            ifStillDifficult: '그 경험이 없었다면 지금의 나는 어떻게 달랐을지 상상해보세요.'
          },
          placeholder: '예: 데이터 분석을 통해 20대 타겟의 숨은 니즈를 발견하고, 이를 바탕으로 만든 캠페인이 실제로 300% 매출 상승이라는 결과로 이어지는 것을 보며...',
          rows: 3
        },
        {
          id: 'q1_1_3',
          label: 'Q1.1.3. 그 이후 어떤 생각이나 행동의 변화가 있었나요?',
          hint: '관심이 실제 행동으로 이어진 구체적 사례',
          guide: {
            description: '답변 가이드: 관심이 실제 행동으로 이어진 구체적 사례',
            diagnosis: '즉석자가진단: "그래서 뭘 했어요?"라는 질문에 3가지 이상 답변 가능한가?',
            helpQuestions: [
              '바로 다음 날/주에 뭘 했나요?',
              '정보 수집은 어떻게 시작했나요?',
              '일상에서 달라진 점은?'
            ],
            ifDifficult: '관심이 생긴 후 실제로 한 행동을 떠올려보세요. 관련 유튜브를 찾아봤거나, 책을 샀거나, 선배에게 물어봤거나 하는 작은 행동도 의미가 있습니다.',
            ifStillDifficult: '최소한 인터넷 검색이라도 했을 것입니다. "구글에서 마케팅 직무를 검색했다", "관련 블로그를 찾아봤다" 등 아주 작은 행동이라도 구체적으로 적어보세요.'
          },
          placeholder: '예: 이후 마케팅 관련 활동을 본격적으로 시작했습니다. 먼저 \'마케팅 불변의 법칙\' 같은 기초 서적 3권을 읽었고, 매일 1시간씩 네이버 광고 대행사들의 캠페인 사례를 분석했습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 2,
      title: 'STEP 2: 분야 탐구 과정',
      subtitle: '지속적인 노력과 구체적 활동',
      questions: [
        {
          id: 'q1_2_1',
          label: 'Q1.2.1. 관심 이후 어떤 탐구 활동을 했나요?',
          hint: '구체적 활동 나열 (온/오프라인, 개인/단체)',
          guide: {
            description: '답변 가이드: 구체적 활동 나열 (온/오프라인, 개인/단체)',
            diagnosis: '즉석자가진단: "그 중에서 가장 도움이 된 것은?"이라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '온라인 학습이나 강의는?',
              '동아리, 프로젝트, 대외활동은?',
              '개인적으로 한 실습이나 연습은?'
            ],
            ifDifficult: '작은 활동이라도 괜찮습니다. 온라인 강의 수강, 관련 서적 독서, 유튜브 시청 등도 의미 있는 활동입니다.',
            ifStillDifficult: '최소 3가지 활동을 떠올려보세요. 하나라도 깊게 한 것이 있다면 더욱 좋습니다.'
          },
          placeholder: '예: 첫째, 구글 애널리틱스 자격증을 취득했습니다. 둘째, 교내 마케팅 동아리에서 2개 프로젝트를 진행했습니다. 셋째, 매일 마케팅 관련 뉴스레터 3개를 구독하며 트렌드를 파악했습니다.',
          rows: 3
        },
        {
          id: 'q1_2_2',
          label: 'Q1.2.2. 탐구 과정에서 가장 의미 있었던 경험은?',
          hint: '한 가지 경험을 깊게 설명',
          guide: {
            description: '답변 가이드: 한 가지 경험을 깊게 설명',
            diagnosis: '즉석자가진단: "그 경험에서 배운 점은?"이라고 물으면 구체적 설명 가능한가?',
            helpQuestions: [
              '가장 기억에 남는 활동은?',
              '왜 그 경험이 의미 있었나요?',
              '구체적으로 무엇을 배웠나요?'
            ],
            ifDifficult: '성과가 있었던 경험을 선택하세요. 숫자로 표현할 수 있는 결과가 있다면 더욱 좋습니다.',
            ifStillDifficult: '실패한 경험도 괜찮습니다. 그 경험에서 무엇을 배웠는지가 중요합니다.'
          },
          placeholder: '예: SNS 마케팅 프로젝트에서 콘텐츠 기획부터 성과 분석까지 전 과정을 경험한 것이 가장 의미 있었습니다. 특히 A/B 테스트를 통해 CTR을 2배 향상시킨 경험은...',
          rows: 3
        }
      ]
    },
    {
      id: 3,
      title: 'STEP 3: 전문성 이해도',
      subtitle: '직무의 본질과 필요 역량 이해',
      questions: [
        {
          id: 'q1_3_1',
          label: 'Q1.3.1. 이 분야/직무에서 가장 중요한 것은 무엇이라고 생각하나요?',
          hint: '본질적 역량과 마인드셋 중심',
          guide: {
            description: '답변 가이드: 본질적 역량과 마인드셋 중심',
            diagnosis: '즉석자가진단: "왜 그게 중요해요?"라고 물으면 논리적 설명 가능한가?',
            helpQuestions: [
              '이 직무의 핵심 목표는 무엇인가요?',
              '성공하는 사람들의 공통점은?',
              '어떤 마인드셋이 필요한가요?'
            ],
            ifDifficult: '현직자 인터뷰나 채용공고의 우대사항을 참고하세요.',
            ifStillDifficult: '이 직무가 회사에 주는 가치가 무엇인지 생각해보세요.'
          },
          placeholder: '예: 마케팅에서 가장 중요한 것은 \'고객 중심 사고\'와 \'데이터 기반 의사결정\'이라고 생각합니다. 고객의 진짜 니즈를 파악하고, 이를 데이터로 검증하여...',
          rows: 3
        },
        {
          id: 'q1_3_2',
          label: 'Q1.3.2. 이 직무를 수행하는데 필요한 역량 3가지는?',
          hint: '구체적 역량과 이유 설명',
          guide: {
            description: '답변 가이드: 구체적 역량과 이유 설명',
            diagnosis: '즉석자가진단: "그 역량을 어떻게 기를 건가요?"라고 물으면 답변 가능한가?',
            helpQuestions: [
              '하드 스킬(기술)은 무엇이 필요한가요?',
              '소프트 스킬(태도)은 무엇이 필요한가요?',
              '각 역량이 왜 중요한가요?'
            ],
            ifDifficult: '채용공고의 자격요건을 참고하되, 왜 그 역량이 필요한지 본인의 언어로 설명하세요.',
            ifStillDifficult: '현재 보유한 역량과 부족한 역량을 구분하여 정리해보세요.'
          },
          placeholder: '예: 첫째, 데이터 분석 능력 - 고객 행동 패턴 파악을 위해 둘째, 창의력 - 차별화된 캠페인 기획을 위해 셋째, 커뮤니케이션 능력 - 팀 협업과 고객 소통을 위해',
          rows: 3
        },
        {
          id: 'q1_3_3',
          label: 'Q1.3.3. 현재 나의 준비 상태는?',
          hint: '보유 역량과 부족한 부분 솔직하게',
          guide: {
            description: '답변 가이드: 보유 역량과 부족한 부분 솔직하게',
            diagnosis: '즉석자가진단: "부족한 부분을 어떻게 채울 건가요?"라고 물으면 구체적 계획 제시 가능한가?',
            helpQuestions: [
              '현재 갖춘 역량은?',
              '부족한 역량은?',
              '보완 계획은?'
            ],
            ifDifficult: '자만하지도, 과소평가하지도 말고 객관적으로 평가하세요.',
            ifStillDifficult: '구체적인 증거(프로젝트, 자격증 등)가 있는 것만 보유 역량으로 언급하세요.'
          },
          placeholder: '예: 데이터 분석은 엑셀과 구글 애널리틱스를 다룰 수 있지만, SQL과 파이썬은 아직 기초 수준입니다. 입사 전까지 온라인 강의로 집중 학습할 계획입니다.',
          rows: 3
        }
      ]
    },
    {
      id: 4,
      title: 'STEP 4: 회사 선택 이유',
      subtitle: '이 회사만의 차별점과 적합성',
      questions: [
        {
          id: 'q1_4_1',
          label: 'Q1.4.1. 이 회사만의 차별점은 무엇인가요?',
          hint: '구체적 강점, 문화, 비전 등',
          guide: {
            description: '답변 가이드: 구체적 강점, 문화, 비전 등',
            diagnosis: '즉석자가진단: "다른 회사와 어떻게 다른가요?"라고 물으면 명확히 설명 가능한가?',
            helpQuestions: [
              '이 회사의 독특한 비즈니스 모델은?',
              '조직 문화의 특징은?',
              '업계에서의 포지션은?'
            ],
            ifDifficult: '회사 홈페이지, 뉴스 기사, 현직자 인터뷰 등을 참고하세요.',
            ifStillDifficult: '최소한 3가지 차별점을 찾아보세요. 막연한 표현("업계 1위")보다 구체적 사실이 좋습니다.'
          },
          placeholder: '예: 첫째, \'고객 최우선\' 가치로 유명하며 실제로 CS 만족도 1위, 둘째, \'실패를 두려워하지 않는 문화\'로 혁신적 시도 장려, 셋째, 신입사원 해외연수 등 체계적 성장 프로그램...',
          rows: 3
        },
        {
          id: 'q1_4_2',
          label: 'Q1.4.2. 이 회사가 나와 맞는 이유는?',
          hint: '개인 가치관/성향과 회사 문화의 일치점',
          guide: {
            description: '답변 가이드: 개인 가치관/성향과 회사 문화의 일치점',
            diagnosis: '즉석자가진단: "구체적인 예시를 들어주세요"라고 물으면 제시 가능한가?',
            helpQuestions: [
              '나의 가치관과 맞는 부분은?',
              '나의 성향/강점과 시너지 나는 부분은?',
              '과거 경험에서 비슷한 환경이 있었나요?'
            ],
            ifDifficult: '자신의 강점이나 가치관을 먼저 정리한 후, 회사와 연결점을 찾아보세요.',
            ifStillDifficult: '회사의 인재상과 자신의 특징을 비교해보세요.'
          },
          placeholder: '예: 도전적인 제 성향과 회사의 \'빠른 실행\' 문화가 잘 맞습니다. 대학 시절 스타트업에서 인턴할 때도 빠른 의사결정 환경에서...',
          rows: 3
        },
        {
          id: 'q1_4_3',
          label: 'Q1.4.3. 이 회사의 최근 이슈나 프로젝트 중 관심 있는 것은?',
          hint: '최신 동향 파악 + 개인적 관심 연결',
          guide: {
            description: '답변 가이드: 최신 동향 파악 + 개인적 관심 연결',
            diagnosis: '즉석자가진단: "왜 그게 중요하다고 생각해요?"라고 물으면 의견 제시 가능한가?',
            helpQuestions: [
              '최근 1년간 주요 뉴스는?',
              '신규 서비스나 프로젝트는?',
              '내가 기여할 수 있는 부분은?'
            ],
            ifDifficult: '회사 홈페이지 뉴스룸, 보도자료, CEO 인터뷰를 확인하세요.',
            ifStillDifficult: '업계 전체 트렌드와 회사를 연결하여 설명해도 좋습니다.'
          },
          placeholder: '예: 최근 론칭한 \'AI 기반 개인화 추천 서비스\'에 관심이 있습니다. 빅데이터와 마케팅의 융합이라는 점에서...',
          rows: 3
        }
      ]
    },
    {
      id: 5,
      title: 'STEP 5: 기여 의지 및 방안',
      subtitle: '현실적이고 구체적인 기여 계획',
      questions: [
        {
          id: 'q1_5_1',
          label: 'Q1.5.1. 입사 후 어떻게 기여할 수 있을까요?',
          hint: '현실적이고 구체적인 기여 방안',
          guide: {
            description: '답변 가이드: 현실적이고 구체적인 기여 방안',
            diagnosis: '즉석자가진단: "구체적으로 어떻게요?"라고 물으면 실행 방법 설명 가능한가?',
            helpQuestions: [
              '보유 역량으로 즉시 기여할 수 있는 부분은?',
              '신입이라도 할 수 있는 기여는?',
              '나만의 차별화된 관점이나 경험은?'
            ],
            ifDifficult: '신입사원이 현실적으로 할 수 있는 기여를 생각해보세요. 거창하지 않아도 됩니다.',
            ifStillDifficult: '보조 업무라도 괜찮습니다. "데이터 정리", "트렌드 리서치" 등 구체적으로 제시하세요.'
          },
          placeholder: '예: MZ세대 관점에서 트렌드를 빠르게 캐치하여 타겟 마케팅에 기여하고, SNS 운영 경험을 활용해 디지털 마케팅 실무를 바로 수행할 수 있습니다.',
          rows: 3
        },
        {
          id: 'q1_5_2',
          label: 'Q1.5.2. 부족한 부분을 어떻게 보완할 계획인가요?',
          hint: '겸손함 + 구체적 학습 계획',
          guide: {
            description: '답변 가이드: 겸손함 + 구체적 학습 계획',
            diagnosis: '즉석자가진단: "첫 3개월 동안 뭘 할 건가요?"라고 물으면 계획 제시 가능한가?',
            helpQuestions: [
              '부족한 역량은 무엇인가요?',
              '어떤 방법으로 보완할 건가요?',
              '이미 시작한 노력이 있나요?'
            ],
            ifDifficult: '온라인 강의, 자격증, 멘토링 등 구체적인 학습 방법을 제시하세요.',
            ifStillDifficult: '입사 후 OJT를 통해 배우겠다는 의지와 방법을 구체적으로 설명하세요.'
          },
          placeholder: '예: 실무 경험 부족은 선배들의 노하우를 적극적으로 배우고, 퇴근 후 온라인 강의로 전문 지식을 보충하며, 주말에는 개인 프로젝트로 실습하여...',
          rows: 3
        }
      ]
    },
    {
      id: 6,
      title: 'STEP 6: 성장 계획 및 비전',
      subtitle: '현실적인 단계별 성장 목표',
      questions: [
        {
          id: 'q1_6_1',
          label: 'Q1.6.1. 이 회사에서 3년 후 어떤 모습이고 싶나요?',
          hint: '현실적 목표 + 구체적 역할/책임',
          guide: {
            description: '답변 가이드: 현실적 목표 + 구체적 역할/책임',
            diagnosis: '즉석자가진단: "그때쯤 뭘 하고 있을까요?"라고 물으면 구체적 업무 설명 가능한가?',
            helpQuestions: [
              '3년 후 담당하고 싶은 업무는?',
              '어떤 전문성을 갖추고 싶나요?',
              '팀/조직에서의 역할은?'
            ],
            ifDifficult: '선배 직원들의 커리어 패스를 참고하여 현실적인 목표를 세우세요.',
            ifStillDifficult: '직급이나 직책보다는 역량과 역할 중심으로 설명하세요.'
          },
          placeholder: '예: 3년 후에는 팀 내 데이터 분석 전문가로 자리잡아, 주니어들을 멘토링하고 데이터 기반 의사결정 문화를 확산시키는 역할을 하고 싶습니다.',
          rows: 3
        },
        {
          id: 'q1_6_2',
          label: 'Q1.6.2. 장기적으로 이루고 싶은 목표는?',
          hint: '5-10년 후 비전과 회사 기여',
          guide: {
            description: '답변 가이드: 5-10년 후 비전과 회사 기여',
            diagnosis: '즉석자가진단: "왜 그 목표인가요?"라고 물으면 논리적 설명 가능한가?',
            helpQuestions: [
              '이 분야에서 어떤 전문가가 되고 싶나요?',
              '회사와 함께 이루고 싶은 것은?',
              '개인의 성장이 회사에 어떤 도움이 될까요?'
            ],
            ifDifficult: '롤모델이나 존경하는 선배의 모습을 참고하세요.',
            ifStillDifficult: '막연하지 않게, 현재와 연결되는 목표를 제시하세요.'
          },
          placeholder: '예: 장기적으로는 데이터와 크리에이티브를 결합한 마케팅 전략가가 되어, 회사의 글로벌 진출에 기여하고 싶습니다.',
          rows: 3
        }
      ]
    }
  ];

  const round2Questions = {
    1: [
      {
        id: 'q2_1_1',
        label: 'Q2.1.1. Q1.1.1의 계기를 더 구체적으로 묘사해주세요',
        hint: '그 순간의 디테일한 상황과 감정',
        guide: {
          description: '답변 가이드: 그 순간의 디테일한 상황과 감정을 생생하게 표현',
          diagnosis: '즉석자가진단: "그때 무슨 생각이 들었어요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '그날의 날씨, 분위기, 주변 상황은?',
            '함께 있던 사람들의 반응은?',
            '그 순간 들었던 구체적인 생각은?'
          ],
          ifDifficult: '그때 찍은 사진이나 메모를 찾아보세요. SNS나 일기에 기록이 있는지 확인해보거나 함께했던 사람에게 물어보세요.',
          ifStillDifficult: '계절이라도 기억해보세요. "여름이었고 더웠다", "기말고사 직후였다" 같은 시기적 배경이라도 추가하면 진정성이 높아집니다.'
        },
        placeholder: '예: 그날은 가을 학기 중간고사가 끝난 직후였고, 강의실 창문 너머로 단풍이 보이던 오후였습니다. 교수님이 실제 스타트업 사례를 소개하실 때...',
        rows: 4
      },
      {
        id: 'q2_1_2',
        label: 'Q2.1.2. 그 경험 이전과 이후, 무엇이 달라졌나요?',
        hint: '구체적인 변화와 행동의 차이',
        guide: {
          description: '답변 가이드: 구체적인 변화와 행동의 차이',
          diagnosis: '즉석자가진단: "어떤 점이 가장 크게 변했나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '그 전에는 어땠나요?',
            '그 후 첫 번째로 한 행동은?',
            '지금까지 이어지고 있는 변화는?'
          ],
          ifDifficult: '친구나 가족이 눈치챘을 만한 변화를 떠올려보세요.',
          ifStillDifficult: '작은 습관의 변화라도 구체적으로 표현하세요.'
        },
        placeholder: '예: 그 전에는 마케팅을 막연하게만 생각했다면, 그 이후로는 일상에서 보는 모든 광고를 분석하기 시작했습니다. 지하철 광고를 볼 때마다...',
        rows: 4
      },
      {
        id: 'q2_1_3',
        label: 'Q2.1.3. 왜 하필 이 분야였나요?',
        hint: '다른 선택지 대비 이 분야를 선택한 이유',
        guide: {
          description: '답변 가이드: 다른 선택지 대비 이 분야를 선택한 이유',
          diagnosis: '즉석자가진단: "다른 분야는 왜 안 됐나요?"라고 물으면 답변 가능한가?',
          helpQuestions: [
            '다른 어떤 선택지가 있었나요?',
            '왜 이 분야가 더 매력적이었나요?',
            '이 분야만의 특별함은?'
          ],
          ifDifficult: '자신의 강점이나 가치관과 연결하여 설명해보세요.',
          ifStillDifficult: '이 분야에서 느끼는 즐거움이나 보람을 구체적으로 표현하세요.'
        },
        placeholder: '예: 개발도 고려했지만, 사람과 데이터를 연결하는 마케팅이 제 강점인 커뮤니케이션 능력을 더 잘 살릴 수 있다고 판단했습니다.',
        rows: 4
      }
    ],
    2: [
      {
        id: 'q2_2_1',
        label: 'Q2.2.1. 각 활동의 구체적인 성과는?',
        hint: '측정 가능한 결과와 배운 점',
        guide: {
          description: '답변 가이드: 측정 가능한 결과와 배운 점',
          diagnosis: '즉석자가진단: "구체적으로 어떤 성과가 있었나요?"라고 물으면 숫자로 답변 가능한가?',
          helpQuestions: [
            '각 활동에서 얻은 구체적 결과는?',
            '수치로 표현할 수 있는 성과는?',
            '그 활동을 통해 배운 핵심은?'
          ],
          ifDifficult: '작은 성과도 의미가 있습니다. "블로그 포스팅 10개", "수강 완료율 95%" 같은 것도 성과입니다.',
          ifStillDifficult: '과정에서 얻은 인사이트나 깨달음도 성과로 표현할 수 있습니다.'
        },
        placeholder: '예: 6개월간의 탐구로 구체적인 결과물을 만들었습니다. 브랜드 분석 리포트 10개를 작성해 블로그에 포스팅했고, 누적 조회수 5,000회를 달성했습니다.',
        rows: 4
      },
      {
        id: 'q2_2_2',
        label: 'Q2.2.2. 탐구 과정에서 어려웠던 점과 극복 방법은?',
        hint: '구체적인 어려움과 해결 과정',
        guide: {
          description: '답변 가이드: 구체적인 어려움과 해결 과정',
          diagnosis: '즉석자가진단: "어떻게 극복했나요?"라고 물으면 단계별 설명 가능한가?',
          helpQuestions: [
            '가장 힘들었던 순간은?',
            '어떤 방법으로 해결했나요?',
            '누구의 도움을 받았나요?'
          ],
          ifDifficult: '포기하고 싶었던 순간을 떠올려보세요. 그럼에도 계속한 이유는 무엇인가요?',
          ifStillDifficult: '작은 어려움이라도 구체적으로 표현하고, 극복 과정을 솔직하게 적어보세요.'
        },
        placeholder: '예: 처음에는 마케팅 용어가 너무 어려워 좌절했습니다. 하지만 매일 10개씩 용어를 정리하고, 실제 사례에 적용해보며 이해도를 높였습니다.',
        rows: 4
      }
    ],
    3: [
      {
        id: 'q2_3_1',
        label: 'Q2.3.1. 이 직무의 하루 일과를 상상해서 설명해주세요',
        hint: '현실적이고 구체적인 업무 일과',
        guide: {
          description: '답변 가이드: 현실적이고 구체적인 업무 일과 묘사',
          diagnosis: '즉석자가진단: "그 중 가장 어려운 업무는 뭘까요?"라고 물으면 답변 가능한가?',
          helpQuestions: [
            '오전에는 주로 무슨 업무를?',
            '협업은 누구와 어떻게?',
            '가장 시간이 많이 걸리는 업무는?'
          ],
          ifDifficult: '현직자 인터뷰나 브런치 글을 참고하세요. 채용공고의 주요 업무를 시간대별로 배치해보거나 인턴이나 현장실습 경험을 떠올려보세요.',
          ifStillDifficult: '일반적인 직무 흐름이라도 자신의 언어로 표현하세요.'
        },
        placeholder: '예: 오전에는 전날 실행한 캠페인의 성과를 분석하고, 점심 후에는 팀 회의에서 새로운 아이디어를 브레인스토밍합니다. 오후에는 콘텐츠 제작과...',
        rows: 4
      },
      {
        id: 'q2_3_2',
        label: 'Q2.3.2. 이 직무에서 가장 도전적인 부분은 무엇이고, 어떻게 준비하고 있나요?',
        hint: '현실적인 어려움 인식과 대비책',
        guide: {
          description: '답변 가이드: 현실적인 어려움 인식과 대비책',
          diagnosis: '즉석자가진단: "준비가 부족하다고 느껴지지 않나요?"라고 물으면 솔직하게 답변 가능한가?',
          helpQuestions: [
            '이 직무에서 가장 어려운 점은?',
            '그 어려움을 극복하기 위해 지금 하고 있는 것은?',
            '입사 후 어떻게 대비할 계획인가요?'
          ],
          ifDifficult: '현직자들이 토로하는 어려움을 찾아보고, 자신의 대비책을 구체적으로 제시하세요.',
          ifStillDifficult: '겸손하게 인정하되, 배우고자 하는 의지를 구체적으로 표현하세요.'
        },
        placeholder: '예: 가장 어려운 부분은 실시간 트렌드를 빠르게 캐치하고 콘텐츠로 만드는 것입니다. 이를 위해 매일 30분씩 트렌드 리포트를 작성하며 감각을 키우고 있습니다.',
        rows: 4
      },
      {
        id: 'q2_3_3',
        label: 'Q2.3.3. 부족한 역량을 채우기 위한 구체적 계획은?',
        hint: '우선순위가 명확하고 실행 가능한 계획',
        guide: {
          description: '답변 가이드: 우선순위가 명확하고 실행 가능한 계획',
          diagnosis: '즉석자가진단: "첫 달에는 뭘 할 건가요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '우선순위를 정한다면?',
            '각각 언제까지, 어떻게?',
            '이미 시작한 것이 있다면?'
          ],
          ifDifficult: '온라인 강의, 자격증, 독서, 스터디 등 구체적인 학습 방법을 떠올려보세요.',
          ifStillDifficult: '입사 후 배울 수 있는 것과 지금 준비할 수 있는 것을 구분하세요.'
        },
        placeholder: '예: 우선 데이터 분석 역량 강화를 위해 현재 SQL 강의를 수강 중이며, 다음 달까지 기초 과정을 마칠 예정입니다.',
        rows: 4
      }
    ],
    4: [
      {
        id: 'q2_4_1',
        label: 'Q2.4.1. 이 회사의 최근 1년 주요 뉴스나 변화는?',
        hint: '구체적인 사실과 날짜, 내용',
        guide: {
          description: '답변 가이드: 구체적인 사실과 날짜, 내용 포함',
          diagnosis: '즉석자가진단: "그게 왜 중요한가요?"라고 물으면 의미 설명 가능한가?',
          helpQuestions: [
            '신규 서비스나 사업 확장은?',
            '조직 문화나 제도의 변화는?',
            '업계에서의 포지션 변화는?'
          ],
          ifDifficult: '회사 홈페이지 뉴스룸을 확인하세요. 관련 기사를 검색해보거나 링크드인이나 블라인드를 참고하세요.',
          ifStillDifficult: '업계 전체 동향과 연결하여 설명해도 좋습니다.'
        },
        placeholder: '예: 2024년 10월, 글로벌 시장 진출을 위해 동남아 3개국에 지사를 설립했습니다. 이는 회사가 국내 시장을 넘어 글로벌 기업으로 도약하려는...',
        rows: 4
      },
      {
        id: 'q2_4_2',
        label: 'Q2.4.2. 경쟁사 대비 이 회사의 장단점은?',
        hint: '객관적 비교와 선택 이유',
        guide: {
          description: '답변 가이드: 객관적 비교와 선택 이유',
          diagnosis: '즉석자가진단: "경쟁사도 좋은데 왜 여기인가요?"라고 물으면 명확히 답변 가능한가?',
          helpQuestions: [
            '주요 경쟁사는 누구인가요?',
            '각 회사의 강점은?',
            '이 회사를 선택한 결정적 이유는?'
          ],
          ifDifficult: '객관적인 비교 자료(시장점유율, 성장률 등)를 찾아보세요.',
          ifStillDifficult: '단점도 인정하되, 그럼에도 이 회사를 선택한 이유를 명확히 하세요.'
        },
        placeholder: '예: A사는 규모가 크지만, 이 회사는 의사결정이 빠르고 신입에게도 기회가 많다는 점에서 제 성장에 더 적합하다고 판단했습니다.',
        rows: 4
      },
      {
        id: 'q2_4_3',
        label: 'Q2.4.3. 이 회사가 직면한 도전 과제와 기회는?',
        hint: '산업 트렌드와 연결한 통찰',
        guide: {
          description: '답변 가이드: 산업 트렌드와 연결한 통찰력 있는 분석',
          diagnosis: '즉석자가진단: "당신이 어떻게 기여할 수 있을까요?"라고 물으면 연결 가능한가?',
          helpQuestions: [
            '현재 가장 집중하는 이슈는?',
            '향후 성장 동력은?',
            '내가 기여할 수 있는 부분은?'
          ],
          ifDifficult: '산업 리포트, 애널리스트 보고서, CEO 인터뷰를 찾아보세요.',
          ifStillDifficult: '일반적인 산업 트렌드라도 회사와 연결하세요.'
        },
        placeholder: '예: 가장 큰 도전은 MZ세대 고객 확보와 해외 시장 진출입니다. 제가 MZ세대로서 또래 문화를 잘 이해하고 있고, 글로벌 트렌드에 민감하다는 점에서...',
        rows: 4
      }
    ],
    5: [
      {
        id: 'q2_5_1',
        label: 'Q2.5.1. Q1.5.1의 기여 방안을 프로젝트 단위로 설명해주세요',
        hint: '구체적인 프로젝트 아이디어와 실행 계획',
        guide: {
          description: '답변 가이드: 구체적인 프로젝트 아이디어와 실행 계획',
          diagnosis: '즉석자가진단: "필요한 리소스는 뭐예요?"라고 물으면 답변 가능한가?',
          helpQuestions: [
            '구체적인 프로젝트명은?',
            '필요한 리소스와 기간은?',
            '예상되는 성과 지표는?'
          ],
          ifDifficult: '현재 회사가 진행 중인 프로젝트를 참고하거나, 업계 트렌드에 맞는 신규 프로젝트를 제안해보세요.',
          ifStillDifficult: '작은 프로젝트라도 구체적으로 설명하세요.'
        },
        placeholder: '예: "MZ세대 고객 확보 프로젝트"를 제안합니다. 첫 3개월간 인스타그램과 틱톡 중심으로 바이럴 콘텐츠를 주 3회 제작하여, 팔로워 10,000명 확보를 목표로...',
        rows: 4
      },
      {
        id: 'q2_5_2',
        label: 'Q2.5.2. 입사 첫 달, 첫 주에 구체적으로 무엇을 할 건가요?',
        hint: '즉시 실행 가능한 액션 플랜',
        guide: {
          description: '답변 가이드: 즉시 실행 가능한 액션 플랜',
          diagnosis: '즉석자가진단: "너무 이상적이지 않나요?"라고 물으면 현실성을 설명할 수 있는가?',
          helpQuestions: [
            '첫 주 일정은?',
            '첫 달 목표는?',
            '누구와 협업할 건가요?'
          ],
          ifDifficult: '신입사원의 온보딩 과정을 상상해보세요.',
          ifStillDifficult: '기본적인 적응 과정도 구체적으로 표현하세요.'
        },
        placeholder: '예: 첫 주에는 팀원들과 1:1 미팅을 통해 업무 방식을 파악하고, 기존 캠페인 결과 데이터를 분석하며 빠르게 학습하겠습니다.',
        rows: 4
      },
      {
        id: 'q2_5_3',
        label: 'Q2.5.3. 이 회사 특유의 상황에서 어떻게 적응할 건가요?',
        hint: '회사 문화와 업무 방식에 대한 구체적 적응 전략',
        guide: {
          description: '답변 가이드: 회사 문화와 업무 방식에 대한 구체적 적응 전략',
          diagnosis: '즉석자가진단: "첫 주에 뭘 할 건가요?"라고 물으면 구체적 계획 제시 가능한가?',
          helpQuestions: [
            '빠른 의사결정 문화에 적응하려면?',
            '글로벌 협업이 필요하다면?',
            '애자일한 조직 문화에서는?'
          ],
          ifDifficult: '회사의 특징적인 문화나 업무 방식을 하나 선택해서 그에 대한 적응 방법을 구체적으로 설명하세요.',
          ifStillDifficult: '일반적인 적응 전략이라도 구체화하세요.'
        },
        placeholder: '예: 귀사의 \'애자일 업무 방식\'에 빠르게 적응하기 위해 이미 스크럼 방법론을 독학으로 공부했습니다. 첫 달은 스프린트 회의에 적극 참여하며...',
        rows: 4
      }
    ],
    6: [
      {
        id: 'q2_6_1',
        label: 'Q2.6.1. 롤모델이 있다면 누구이고, 왜인가요?',
        hint: '구체적인 인물과 닮고 싶은 점',
        guide: {
          description: '답변 가이드: 구체적인 인물과 닮고 싶은 점 명확히',
          diagnosis: '즉석자가진단: "그 사람의 어떤 점을 닮고 싶어요?"라고 물으면 구체적 설명 가능한가?',
          helpQuestions: [
            '그 사람의 어떤 점을 닮고 싶나요?',
            '그 사람의 커리어 경로는?',
            '나만의 차별점은 무엇일까요?'
          ],
          ifDifficult: '업계 유명 인사를 찾아보세요. 회사 내 리더들의 인터뷰를 읽어보거나 존경하는 선배나 교수님을 떠올려보세요.',
          ifStillDifficult: '유명하지 않아도 괜찮습니다. "우리 회사 5년차 선배" 같은 구체적인 사례도 좋습니다.'
        },
        placeholder: '예: \'마케터의 일\' 저자 장인성 님을 롤모델로 삼고 있습니다. 데이터와 크리에이티브를 균형 있게 다루시는 점, 특히 숫자 뒤에 숨은 고객 인사이트를 찾아내는 능력이...',
        rows: 4
      },
      {
        id: 'q2_6_2',
        label: 'Q2.6.2. 이 분야에서 나만의 전문성을 어떻게 만들 건가요?',
        hint: '차별화된 전문 영역과 구체적 계획',
        guide: {
          description: '답변 가이드: 차별화된 전문 영역과 구체적 계획',
          diagnosis: '즉석자가진단: "왜 그 분야인가요?"라고 물으면 논리적 설명 가능한가?',
          helpQuestions: [
            '어떤 세부 분야에 집중할 건가요?',
            '차별화 포인트는 무엇인가요?',
            '그를 위한 준비는?'
          ],
          ifDifficult: '현재 트렌드와 자신의 강점을 결합해보세요. "AI + 마케팅" 같은 융합 분야도 좋습니다.',
          ifStillDifficult: '기본에 충실하되 한 가지를 깊게 파는 전략도 좋습니다.'
        },
        placeholder: '예: \'데이터 기반 그로스 마케팅\' 전문가가 되고자 합니다. 단순히 데이터를 분석하는 것을 넘어, 고객 행동 데이터에서 성장 기회를 발견하고...',
        rows: 4
      }
    ]
  };

  const round3Questions = [
    {
      id: 'connect_1_2',
      label: '연결 확인 1→2: 관심 계기에서 탐구 과정으로',
      hint: 'STEP 1의 관심 계기가 STEP 2의 탐구 활동으로 어떻게 연결되나요?',
      placeholder: '예: 이러한 관심은 실제 행동으로 이어졌습니다. 프로젝트 이후 마케팅의 매력을 느껴, 체계적으로 공부하기 시작했고...',
      rows: 3,
      referenceSteps: [1, 2],
      referenceQuestions: ['q1_1_1', 'q1_1_3', 'q1_2_1']
    },
    {
      id: 'connect_2_3',
      label: '연결 확인 2→3: 탐구 과정에서 전문성 이해로',
      hint: 'STEP 2의 탐구 활동이 STEP 3의 직무 이해로 어떻게 발전했나요?',
      placeholder: '예: 다양한 경험을 통해 이 직무에는 데이터 분석 능력과 창의력, 그리고 끊임없는 학습 의지가 필요하다는 것을 깨달았습니다...',
      rows: 3,
      referenceSteps: [2, 3],
      referenceQuestions: ['q1_2_1', 'q1_2_2', 'q1_3_1']
    },
    {
      id: 'connect_3_4',
      label: '연결 확인 3→4: 전문성 이해에서 회사 선택으로',
      hint: 'STEP 3의 직무 이해가 STEP 4의 회사 선택과 어떻게 연결되나요?',
      placeholder: '예: 이러한 이해를 바탕으로 귀사를 선택한 이유는, 귀사만이 가진 혁신적인 조직 문화와 성장 기회가 제가 추구하는 가치와 정확히 일치했기 때문입니다...',
      rows: 3,
      referenceSteps: [3, 4],
      referenceQuestions: ['q1_3_1', 'q1_3_2', 'q1_4_1']
    },
    {
      id: 'connect_4_5',
      label: '연결 확인 4→5: 회사 선택에서 기여 방안으로',
      hint: 'STEP 4의 회사 이해가 STEP 5의 구체적 기여로 어떻게 이어지나요?',
      placeholder: '예: 귀사에서 저는 MZ세대 시장 확대라는 과제에 제 경험과 역량을 활용하여 즉시 기여할 수 있을 것입니다...',
      rows: 3,
      referenceSteps: [4, 5],
      referenceQuestions: ['q1_4_1', 'q1_4_2', 'q1_5_1']
    },
    {
      id: 'connect_5_6',
      label: '연결 확인 5→6: 기여 방안에서 성장 비전으로',
      hint: 'STEP 5의 기여가 STEP 6의 성장 목표로 어떻게 발전하나요?',
      placeholder: '예: 단기적 기여를 넘어, 저는 이 회사에서 데이터와 크리에이티브를 결합한 마케팅 전문가로 성장하여, 장기적으로 회사의 글로벌 진출에 기여하고 싶습니다...',
      rows: 3,
      referenceSteps: [5, 6],
      referenceQuestions: ['q1_5_1', 'q1_5_2', 'q1_6_1']
    }
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleBasicInfoChange = (field, value) => {
    setBasicInfo(prev => ({ ...prev, [field]: value }));
  };

  const toggleGuide = (questionId) => {
    setShowGuide(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const toggleStepSelection = (stepId) => {
    setSelectedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
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
    } else if (currentPhase === 'evaluation') {
      setCurrentPhase('round1');
      setCurrentStep(round1Steps.length - 1);
    } else if (currentPhase === 'round1' && currentStep === 0) {
      setShowIntro(true);
    }
  };

  const generateMotivationLetter = () => {
    const parts = [];
    
    if (answers.q1_1_1) parts.push(answers.q1_1_1);
    if (answers.q1_1_2) parts.push(answers.q1_1_2);
    if (answers.connect_1_2) parts.push('\n' + answers.connect_1_2);
    if (answers.q1_2_1) parts.push('\n' + answers.q1_2_1);
    if (answers.q1_2_2) parts.push(answers.q1_2_2);
    if (answers.connect_2_3) parts.push('\n' + answers.connect_2_3);
    if (answers.q1_3_1) parts.push('\n' + answers.q1_3_1);
    if (answers.q1_3_2) parts.push(answers.q1_3_2);
    if (answers.connect_3_4) parts.push('\n' + answers.connect_3_4);
    if (answers.q1_4_1) parts.push('\n' + answers.q1_4_1);
    if (answers.q1_4_2) parts.push(answers.q1_4_2);
    if (answers.connect_4_5) parts.push('\n' + answers.connect_4_5);
    if (answers.q1_5_1) parts.push('\n' + answers.q1_5_1);
    if (answers.q1_5_2) parts.push(answers.q1_5_2);
    if (answers.connect_5_6) parts.push('\n' + answers.connect_5_6);
    if (answers.q1_6_1) parts.push('\n' + answers.q1_6_1);
    if (answers.q1_6_2) parts.push(answers.q1_6_2);
    
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
${finalText.split('\n\n').map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`).join('\n')}
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
    return `📋 원본 답변 모음\n\n[기본 정보]\n산업: ${basicInfo.industry || '-'}\n직무: ${basicInfo.position || '-'}\n회사: ${basicInfo.company || '-'}\n\n[STEP 1: 관심 계기]\nQ1.1.1: ${answers.q1_1_1 || '-'}\nQ1.1.2: ${answers.q1_1_2 || '-'}\nQ1.1.3: ${answers.q1_1_3 || '-'}\n\n[STEP 2: 탐구 과정]\nQ1.2.1: ${answers.q1_2_1 || '-'}\nQ1.2.2: ${answers.q1_2_2 || '-'}\n\n[STEP 3: 전문성 이해]\nQ1.3.1: ${answers.q1_3_1 || '-'}\nQ1.3.2: ${answers.q1_3_2 || '-'}\nQ1.3.3: ${answers.q1_3_3 || '-'}\n\n[STEP 4: 회사 선택]\nQ1.4.1: ${answers.q1_4_1 || '-'}\nQ1.4.2: ${answers.q1_4_2 || '-'}\nQ1.4.3: ${answers.q1_4_3 || '-'}\n\n[STEP 5: 기여 방안]\nQ1.5.1: ${answers.q1_5_1 || '-'}\nQ1.5.2: ${answers.q1_5_2 || '-'}\n\n[STEP 6: 성장 비전]\nQ1.6.1: ${answers.q1_6_1 || '-'}\nQ1.6.2: ${answers.q1_6_2 || '-'}\n\n[3라운드 연결]\n1→2: ${answers.connect_1_2 || '-'}\n2→3: ${answers.connect_2_3 || '-'}\n3→4: ${answers.connect_3_4 || '-'}\n4→5: ${answers.connect_4_5 || '-'}\n5→6: ${answers.connect_5_6 || '-'}`;
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

  const progress = currentPhase === 'round1'
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">비밀번호를 입력하세요</label>
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
            <p className="text-center text-gray-600 mb-8">CareerEngineer의 3라운드 체계적 작성 시스템</p>

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
                <li><strong>진정성:</strong> 3초 자가진단 통과한 내용만</li>
                <li><strong>구체성:</strong> 숫자와 사실로 표현</li>
                <li><strong>검증 가능성:</strong> 가족도 인정할 사실만</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-yellow-300">
                <p className="text-sm font-semibold text-gray-800 mb-2">💡 3초 자가진단이란?</p>
                <p className="text-sm text-gray-700">
                  누군가 "정말이에요?"라고 물었을 때 <strong>3초 안에 자신있게 구체적인 예시나 증거를 댈 수 있는지</strong> 확인하는 것입니다.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-red-800 mb-2">⚠️ 반드시 확인</h3>
              <p className="text-sm text-red-700">
                작성하는 내용은 자동으로 저장되지 않으며 새로고침 버튼을 누르면 그동안 작성했던 내용은 사라집니다. 내용 작성 후 마지막 페이지에서 반드시 워드 파일(.doc)로 다운로드 하여 작성한 내용을 보관하세요
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-800 text-center">
                  © 2025 CareerEngineer All Rights Reserved.
                </p>
                <p className="text-xs text-red-800 text-center mt-1 font-semibold">
                  이 워크북은 저작권법에 의해 보호받는 저작물입니다. 워크북의 전체 또는 일부를 저작권자의 사전 서면 동의 없이 무단으로 복제, 배포, 전송, 전시, 방송하거나 수정 및 편집하는 행위는 금지되어 있으며, 위반 시 관련 법령에 따라 법적인 책임을 질 수 있습니다. 오직 개인적인 용도로만 사용해야 하며, 상업적 목적의 사용 및 무단 배포를 엄격히 금지합니다.
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
              {round1Steps.slice(1).map(step => {
                const stepId = step.id;
                const isSelected = selectedSteps.includes(stepId);
                
                return (
                  <div 
                    key={stepId}
                    className={`border-2 rounded-lg p-5 transition-all ${
                      isSelected 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-1">{step.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{step.subtitle}</p>
                        <div className="bg-gray-50 rounded p-3 text-sm text-gray-700">
                          <strong>내 답변:</strong> {answers[step.questions[0].id]?.substring(0, 100) || '(답변 없음)'}
                          {answers[step.questions[0].id]?.length > 100 && '...'}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleStepSelection(stepId)}
                        className={`ml-4 px-4 py-2 rounded-lg font-semibold transition-colors ${
                          isSelected 
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
                <strong>💡 선택 기준:</strong> 답변이 부족하거나 더 구체화가 필요한 STEP을 자유롭게 선택하세요. (1개 이상)
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
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                지원동기 완성! 🎉
              </h2>
              <p className="text-gray-600">
                아래 내용을 확인하고 자유롭게 수정하세요
              </p>
            </div>

            <div className="bg-red-100 border-2 border-red-500 rounded-lg p-5 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">⚠️</span>
                <div>
                  <p className="text-base font-bold text-red-900 mb-2">
                    반드시 다운로드하세요!
                  </p>
                  <p className="text-sm text-red-800 leading-relaxed">
                    지금까지 작성한 모든 내용은 브라우저에만 임시 저장되어 있습니다. 
                    페이지를 새로고침하거나 닫으면 <strong>모든 내용이 즉시 삭제</strong>됩니다.
                    <br />
                    <strong>내용 수정 후 "워드 파일로 다운로드"</strong> 버튼을 눌러 .doc 파일로 저장하세요!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                  완성된 지원동기 (수정 가능)
                </h3>
                <button
                  onClick={() => setShowRawAnswers(!showRawAnswers)}
                  className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  {showRawAnswers ? '원본 답변 숨기기' : '원본 답변 보기'}
                </button>
              </div>
              
              <textarea
                value={finalText}
                onChange={(e) => setFinalText(e.target.value)}
                rows={20}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none font-serif leading-relaxed"
              />
            </div>

            {showRawAnswers && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">📋 원본 답변 참고</h4>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {getRawAnswersText()}
                </pre>
              </div>
            )}

            <button
              onClick={downloadFinalText}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold text-lg shadow-lg mb-4"
            >
              <Download className="w-6 h-6" />
              워드 파일로 다운로드 (.doc)
            </button>

            {downloadSuccess && (
              <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center mb-4">
                <p className="text-green-800 font-semibold">
                  ✅ 다운로드 완료!
                </p>
                <p className="text-sm text-green-700 mt-1">
                  다운로드 폴더에서 "{basicInfo.company || '회사'}_지원동기.doc" 파일을 Microsoft Word로 열어주세요.
                </p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-800">
                💾 <strong>워드에서 편집 가능:</strong> 다운로드한 .doc 파일을 Microsoft Word에서 열어 자유롭게 편집하고 서식을 적용할 수 있습니다.
              </p>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={goToPrevStep}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                이전으로
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-800 text-center">
                © 2025 CareerEngineer All Rights Reserved.
              </p>
              <p className="text-xs text-red-800 text-center mt-1 font-semibold">
                이 워크북은 저작권법에 의해 보호받는 저작물입니다. 워크북의 전체 또는 일부를 저작권자의 사전 서면 동의 없이 무단으로 복제, 배포, 전송, 전시, 방송하거나 수정 및 편집하는 행위는 금지되어 있으며, 위반 시 관련 법령에 따라 법적인 책임을 질 수 있습니다. 오직 개인적인 용도로만 사용해야 하며, 상업적 목적의 사용 및 무단 배포를 엄격히 금지합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = currentPhase === 'round1' 
    ? round1Steps[currentStep]
    : currentPhase === 'round2'
    ? { 
        title: `${round1Steps[selectedSteps[currentStep]].title} - 심화`,
        questions: round2Questions[selectedSteps[currentStep]]
      }
    : {
        title: '3라운드: 연결 및 완성',
        questions: [round3Questions[currentStep]]
      };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            CareerEngineer 지원동기 작성 워크북
          </h1>
          <p className="text-gray-600">
            체계적인 3라운드 시스템으로 완성하는 지원동기
          </p>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                {currentPhase === 'round1' ? '1라운드' : currentPhase === 'round2' ? '2라운드' : '3라운드'} - {currentStepData.title}
              </span>
              <span>전체 진행률: {Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                style={{ width: progress + '%' }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {currentStepData.title}
          </h2>
          {currentStepData.subtitle && (
            <p className="text-gray-600 mb-6">{currentStepData.subtitle}</p>
          )}

          {currentStep === 0 && currentPhase === 'round1' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  지원하고자 하는 산업
                </label>
                <input
                  type="text"
                  value={basicInfo.industry}
                  onChange={(e) => handleBasicInfoChange('industry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: IT, 금융, 제조, 유통 등"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  지원하고자 하는 직무
                </label>
                <input
                  type="text"
                  value={basicInfo.position}
                  onChange={(e) => handleBasicInfoChange('position', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 마케팅, 개발, 기획, 영업 등"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  지원하고자 하는 회사명
                </label>
                <input
                  type="text"
                  value={basicInfo.company}
                  onChange={(e) => handleBasicInfoChange('company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 삼성전자, 네이버, 카카오 등"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {currentStepData.questions.map((q) => (
                <div key={q.id} className="mb-6 border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <label className="text-lg font-semibold text-gray-800">
                      {q.label}
                    </label>
                    {q.guide && (
                      <button
                        onClick={() => toggleGuide(q.id)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <HelpCircle className="w-4 h-4" />
                        {showGuide[q.id] ? '가이드 숨기기' : '가이드 보기'}
                      </button>
                    )}
                  </div>
                  
                  {q.hint && (
                    <p className="text-sm text-gray-600 mb-2">💡 {q.hint}</p>
                  )}
                  
                  {q.referenceQuestions && (
                    <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-3">
                      <p className="text-sm font-semibold text-indigo-900 mb-2">📚 참고: 이전 답변</p>
                      <div className="space-y-3">
                        {q.referenceQuestions.map((refId) => {
                          const refQuestion = [...round1Steps.flatMap(s => s.questions || [])].find(q => q?.id === refId);
                          if (!refQuestion || !answers[refId]) return null;
                          return (
                            <div key={refId} className="bg-white p-3 rounded text-sm">
                              <p className="font-semibold text-gray-700 mb-1">{refQuestion.label}</p>
                              <p className="text-gray-600 italic">{answers[refId]?.substring(0, 150)}{answers[refId]?.length > 150 ? '...' : ''}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {q.guide && showGuide[q.id] && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-3 space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-1">📝 {q.guide.description}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-1">🎯 {q.guide.diagnosis}</p>
                      </div>
                      
                      {q.guide.helpQuestions && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">❓ 구체화 도움 질문:</p>
                          <ul className="text-sm text-blue-800 space-y-1 ml-4">
                            {q.guide.helpQuestions.map((hq, i) => (
                              <li key={i}>• {hq}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {q.guide.ifDifficult && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">💭 답변하기 어렵다면:</p>
                          <p className="text-sm text-blue-800">{q.guide.ifDifficult}</p>
                        </div>
                      )}
                      
                      {q.guide.ifStillDifficult && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">💡 구체화 도움 질문으로도 어렵다면:</p>
                          <p className="text-sm text-blue-800">{q.guide.ifStillDifficult}</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <textarea
                    value={answers[q.id] || ''}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    rows={q.rows || 3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder={q.placeholder}
                  />
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
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              다음
              <ChevronRight className="w-5 h-5" />
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
};

export default MotivationWorkbook;