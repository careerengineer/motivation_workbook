import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Download, HelpCircle, Eye, Edit3 } from 'lucide-react';

const MotivationWorkbook = () => {
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

  const round1Steps = [
    { id: 0, title: '기본 정보 입력', subtitle: '지원할 산업, 직무, 회사를 입력하세요' },
    {
      id: 1,
      title: 'Q1: 왜 이 직무인가',
      subtitle: '단순 관심을 넘어 가치관·비전·인생 목표와 이 직무의 연결',
      questions: [
        {
          id: 'q1_1_1',
          label: 'Q1-1. 이 직무에 관심을 갖게 된 구체적인 계기는 무엇인가요?',
          hint: '언제, 어디서, 무엇을 통해 — 특정 장면과 감정이 있어야 합니다',
          guide: {
            description: '막연한 관심이 아닌 특정 사건·장면·감정으로 표현하세요.',
            diagnosis: '즉석자가진단: "그때 어떤 기분이었나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '정확히 언제였나요? (학년, 학기, 년도)',
              '어떤 상황에서였나요? (수업, 동아리, 대외활동)',
              '그때 어떤 감정을 느꼈나요?'
            ],
            ifDifficult: '이 직무를 처음 알게 된 순간을 떠올려보세요. 관련 수업이나 책, 영상을 처음 접한 때를 생각해보세요.',
            ifStillDifficult: '주변 사람 중 이 일을 하는 사람을 만난 경험을 떠올려보세요.'
          },
          placeholder: '예: 대학교 2학년 마케팅원론 수업에서 실제 스타트업과 협업해 캠페인을 기획했을 때, 데이터로 고객의 숨은 니즈를 발견하고 이것이 300% 매출 상승으로 이어지는 것을 보며 처음으로 "이 일을 계속하고 싶다"는 확신이 생겼습니다.',
          rows: 4
        },
        {
          id: 'q1_1_2',
          label: 'Q1-2. 이 직무가 나의 가치관·비전·인생 목표와 어떻게 연결되나요?',
          hint: '"잘 맞는다" 수준을 넘어 이 직무가 자신의 삶에서 어떤 의미인지까지',
          guide: {
            description: '이 직무가 왜 하필 나여야 하는지, 삶의 방향과 어떻게 연결되는지가 핵심입니다.',
            diagnosis: '즉석자가진단: "왜 하필 이 직무인가요?"라고 물으면 가치관과 연결해 즉답 가능한가?',
            helpQuestions: [
              '내가 중요하게 생각하는 가치는 무엇인가요?',
              '이 직무가 그 가치와 어떻게 연결되나요?',
              '이 직무 없이도 그 가치를 실현할 수 있나요? 그렇다면 왜 이 직무인가요?'
            ],
            ifDifficult: '가치관을 바로 답하기 어렵다면 2라운드 심화에서 몰입 경험 3가지로 역추적하는 방법을 사용하세요.',
            ifStillDifficult: '다른 직무에도 해당되는 이유라면 충분하지 않습니다. 이 직무만의 이유를 찾아보세요.'
          },
          placeholder: '예: 저는 사람들이 무언가를 선택하는 순간에 오랫동안 관심이 있었습니다. 그 선택의 배경에 있는 감정·욕구·맥락을 이해하고 싶다는 욕구가 늘 있었고, 마케팅이 바로 그 질문에 정면으로 답하는 직무라는 것을 깨달았습니다.',
          rows: 4
        },
        {
          id: 'q1_6_2',
          label: 'Q1-3. 이 직무에서 성장하면 어떤 일을 하게 되는지 알고 있나요? 그 중 해보고 싶은 것은?',
          hint: '성장 경로 이해 → 해보고 싶은 것 → 그것이 지원의 이유 / 상상이 아닌 리서치 기반',
          guide: {
            description: '[입사후포부와 다른 점] "3년 후 이렇게 되겠다"는 계획 선언이 아닙니다. 그 경로가 내가 원하는 것이기 때문에 지원했다는 이유의 설명입니다. 성장 경로를 이해하고 있다는 것은 이 직무를 진지하게 탐색했다는 증거입니다.',
            diagnosis: '즉석자가진단: "이 직무 5년차는 어떤 일을 하나요?"라고 물으면 구체적으로 답할 수 있는가?',
            helpQuestions: [
              '신입 → 주니어 → 시니어로 갈수록 어떤 일을 하나요?',
              '그 경로 중 가장 해보고 싶은 단계는?',
              '왜 그것이 매력적으로 느껴지나요?',
              '이 경로를 어떻게 알게 됐나요? (현직자 인터뷰, 채용공고 등)'
            ],
            ifDifficult: '지원하는 직무의 시니어 채용공고를 찾아보세요. 시니어에게 요구하는 역할이 곧 그 직무의 성장 종착점입니다.',
            ifStillDifficult: '탐구 과정에서 알게 된 현직자의 업무 이야기를 바탕으로 추론해서 적어도 좋습니다.'
          },
          placeholder: '예: 마케터의 커리어 경로를 현직자 인터뷰와 시니어 채용공고로 리서치한 결과, 신입은 캠페인 실행과 데이터 분석을 담당하고, 시니어가 되면 브랜드 전략 전체를 설계하는 일을 맡게 됩니다. 특히 고객 인사이트를 바탕으로 브랜드 방향을 설계하는 일이 해보고 싶었고, 그 길이 이 직무를 통해 가능하다는 것이 지원을 결심한 이유입니다.',
          rows: 5
        }
      ]
    },
    {
      id: 2,
      title: 'Q2: 왜 이 회사인가',
      subtitle: '이 직무를 하는 수많은 회사 중 이 회사여야 하는 이유',
      questions: [
        {
          id: 'q1_4_1',
          label: 'Q2-1. 이 회사만의 차별점은 무엇인가요?',
          hint: '리서치 기반의 구체적 사실 — 다른 회사에는 없는 이 회사만의 것',
          guide: {
            description: '홈페이지, 뉴스룸, CEO 인터뷰, 현직자 이야기를 읽어야 답할 수 있는 내용이어야 합니다.',
            diagnosis: '즉석자가진단: "다른 회사와 어떻게 다른가요?"라고 물으면 구체적 사실로 설명 가능한가?',
            helpQuestions: [
              '이 회사의 독특한 사업 모델이나 기술은?',
              '조직 문화의 특징적인 부분은?',
              '업계에서 이 회사만이 하고 있는 것은?'
            ],
            ifDifficult: '회사 홈페이지, 뉴스 기사, 현직자 인터뷰 등을 참고하세요.',
            ifStillDifficult: '"업계 1위", "빠르게 성장 중" 같은 표현은 차별점이 아닙니다. 구체적 사실을 찾아보세요.'
          },
          placeholder: '예: 귀사는 신입에게도 직접 데이터를 쿼리하고 실험을 설계하는 역할이 주어집니다. 현직자 인터뷰에서 "아이디어를 내면 3일 안에 테스트한다"는 이야기를 확인했습니다.',
          rows: 3
        },
        {
          id: 'q1_4_2',
          label: 'Q2-2. 이 회사가 나의 가치관이나 기여 비전과 맞닿는 구체적인 지점은?',
          hint: '내가 원하는 방식으로 일할 수 있는 환경이 이 회사에 있다는 근거',
          guide: {
            description: 'Q1에서 서술한 가치관·비전과 이 회사의 특징을 직접 연결하세요.',
            diagnosis: '즉석자가진단: "왜 하필 이 회사인가요?"라고 물으면 개인적이고 구체적으로 답할 수 있는가?',
            helpQuestions: [
              'Q1에서 쓴 가치관과 이 회사의 어떤 점이 연결되나요?',
              '이 회사에서만 가능한, 내가 원하는 방식의 일이 있나요?',
              '과거 경험 중 이 회사 문화와 유사한 환경이 있었나요?'
            ],
            ifDifficult: '자신의 강점이나 가치관을 먼저 정리한 후, 회사와 연결점을 찾아보세요.',
            ifStillDifficult: '회사의 인재상과 자신의 특징을 비교해보세요.'
          },
          placeholder: '예: 제가 하고 싶은 일은 "데이터로 고객의 선택을 설계하는 것"인데, 이것이 실제로 가능한 환경이 귀사에 있습니다. 신입에게도 실제 데이터 접근 권한과 실험 설계 권한이 주어진다는 것을 확인했습니다.',
          rows: 3
        },
        {
          id: 'q1_4_3',
          label: 'Q2-3. 이 회사의 최근 방향성이나 과제 중 내가 특히 관심 갖는 것은?',
          hint: '최근 1년 뉴스·프로젝트 기반 — 왜 그것에 관심을 갖는지까지',
          guide: {
            description: '관심 자체가 아니라, 왜 그것에 관심을 갖는지가 드러나야 합니다. 내 역량과 연결될 때 설득력이 생깁니다.',
            diagnosis: '즉석자가진단: "그게 왜 중요하다고 생각해요?"라고 물으면 의견을 제시할 수 있는가?',
            helpQuestions: [
              '최근 1년간 이 회사의 주요 뉴스는?',
              '새로 시작한 사업이나 프로젝트는?',
              '그것이 내 준비나 관심과 어떻게 연결되나요?'
            ],
            ifDifficult: '회사 홈페이지 뉴스룸, 보도자료, CEO 인터뷰를 확인하세요.',
            ifStillDifficult: '업계 전체 트렌드와 회사를 연결하여 설명해도 좋습니다.'
          },
          placeholder: '예: 최근 귀사가 추진 중인 AI 기반 개인화 추천 프로젝트에 관심이 있습니다. 고객 행동 데이터를 분석해 개인화 경험을 설계하는 것이 제가 공부하고 준비해온 방향과 정확히 일치하기 때문입니다.',
          rows: 3
        }
      ]
    },
    {
      id: 3,
      title: 'Q3: 무엇을 왜 준비했는가',
      subtitle: '이 직무, 이 회사를 위해 준비한 역량과 그 목적',
      questions: [
        {
          id: 'q1_3_1',
          label: 'Q3-1. 이 직무에서 원하는 일을 하기 위해 어떤 역량이 필요하다고 판단했나요?',
          hint: '직무 탐구를 통해 스스로 판단한 필요 역량 — 채용공고 복붙 금지',
          guide: {
            description: '[입사후포부와 다른 점] 역량을 나열하는 것이 아닙니다. "이 직무에서 하고 싶은 일을 위해 이런 역량이 필요하다고 판단했고, 그래서 이것을 이런 목적으로 준비했다"는 인과관계가 드러나야 합니다.',
            diagnosis: '즉석자가진단: "왜 그 역량이 필요하다고 생각했나요?"라고 물으면 논리적으로 답할 수 있는가?',
            helpQuestions: [
              'Q1에서 해보고 싶다고 한 일을 잘 하려면 무엇이 필요한가요?',
              '현직자들이 공통적으로 강조하는 역량은?',
              '내가 부족하다고 느껴서 채운 것은?'
            ],
            ifDifficult: '채용공고 자격요건을 참고하되, 왜 그 역량이 필요한지 본인의 언어로 설명하세요.',
            ifStillDifficult: '이 역량이 없으면 Q1에서 해보고 싶다고 한 일을 할 수 없는 이유를 생각해보세요.'
          },
          placeholder: '예: 데이터로 고객의 선택을 설계하는 일을 하려면 고객 행동 데이터를 직접 추출하고 해석하는 능력이 핵심이라고 판단했습니다. 현직자들이 공통적으로 "SQL을 먼저 배웠어야 했다"고 말하는 것을 보고 이 역량이 반드시 필요하다는 확신이 생겼습니다.',
          rows: 3
        },
        {
          id: 'q1_5_2',
          label: 'Q3-2. 그 역량들을 어떻게, 어떤 목적으로 준비했나요?',
          hint: '"~하기 위해 ~을 했다" — 목적이 없는 활동 나열은 스펙 나열과 같습니다',
          guide: {
            description: '각 활동 뒤에 "~하기 위해"가 반드시 들어가야 합니다. 목적이 있어야 준비가 됩니다.',
            diagnosis: '즉석자가진단: "왜 그 활동을 했나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '각 활동을 한 이유가 무엇인가요?',
              '순서가 있다면 왜 그 순서였나요?',
              '단순 스펙이 아닌 하고 싶은 일과의 연결이 있나요?'
            ],
            ifDifficult: '이유가 없는 활동은 과감히 빼세요. 이유 있는 활동만 남기세요.',
            ifStillDifficult: '"~하기 위해 ~을 했다" 문장 구조로 각 활동을 다시 써보세요.'
          },
          placeholder: '예: 고객 행동 데이터를 직접 다루기 위해 SQL을 먼저 익혔고, 그 데이터에서 마케팅 인사이트를 읽어내기 위해 Google Analytics를 학습했습니다. 단순히 자격증을 취득한 것이 아니라, 하고 싶은 일의 순서에 맞게 역량을 쌓아온 과정입니다.',
          rows: 3
        },
        {
          id: 'q1_5_1',
          label: 'Q3-3. 준비한 역량이 이 직무·이 회사에서 어떻게 쓰일 것이라 기대하며 준비했나요?',
          hint: '준비 당시의 기대 — 이 역량이 이 회사 어떤 업무에 어떻게 연결될지 그림이 있었는지',
          guide: {
            description: '이 회사에서 구체적으로 어떤 업무에 연결될지 그림이 있어야 진짜 준비입니다.',
            diagnosis: '즉석자가진단: "그 역량이 입사 후 어떻게 쓰일 것 같나요?"라고 물으면 구체적으로 답할 수 있는가?',
            helpQuestions: [
              '이 역량이 이 회사의 어떤 업무에 연결되나요?',
              '이 회사가 아닌 다른 회사였다면 다르게 준비했을까요?',
              '준비하면서 "이 역량이 이런 상황에서 쓰이겠구나"라고 생각한 장면이 있나요?'
            ],
            ifDifficult: '이 회사 채용공고의 주요 업무 항목을 열어두고 함께 작성하세요.',
            ifStillDifficult: '"이 역량이 있어서 이 업무의 이 부분을 할 수 있다"는 문장으로 써보세요.'
          },
          placeholder: '예: 귀사의 개인화 추천 프로젝트에서 고객 세그먼트를 정교화하는 데이터 분석 업무가 있을 것이라 생각하며 준비했습니다. SQL로 데이터를 추출하고 Google Analytics로 패턴을 분석하는 역량이 그 업무에서 즉시 활용될 수 있을 것이라는 기대가 있었습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 4,
      title: 'Q4: 어떻게 기여할 수 있는가',
      subtitle: '이 동기와 역량이 이 회사의 어떤 과제에 어떻게 연결되는가',
      questions: [
        {
          id: 'q1_q4_1',
          label: 'Q4-1. 이 동기와 준비한 역량이 이 직무에서 어떤 방식으로 기여로 이어지나요?',
          hint: '동기 → 역량 → 기여의 흐름을 한 단락으로 연결 — "열심히 하겠다"가 아닌 인과의 결론',
          guide: {
            description: '기여는 미래 계획의 선언이 아닙니다. Q1~Q3의 내용이 논리적으로 이 기여로 귀결되어야 합니다.',
            diagnosis: '즉석자가진단: "왜 그런 기여를 할 수 있다고 생각하나요?"라고 물으면 동기와 역량으로 즉답 가능한가?',
            helpQuestions: [
              'Q1의 동기와 Q3의 역량이 어떻게 연결되어 기여로 이어지나요?',
              '"도움이 될 것 같아서"가 아닌 이유가 있나요?'
            ],
            ifDifficult: 'Q1에서 쓴 동기와 Q3에서 쓴 역량을 각각 한 줄씩 가져와 "이 동기가 있었기 때문에 이 역량을 준비했고, 그래서 이 기여가 가능하다"로 연결해보세요.',
            ifStillDifficult: '입사후포부처럼 "~을 하겠습니다"가 되지 않도록 주의하세요.'
          },
          placeholder: '예: 데이터로 고객의 선택을 이해하고 싶다는 동기에서 출발하여 SQL과 Google Analytics를 익혔고, 귀사의 고객 행동 데이터를 분석하여 캠페인 타겟 세그먼트를 정교화하는 업무에 즉시 기여할 수 있습니다. "도움이 될 것 같아서"가 아니라, 하고 싶었던 일을 위해 준비한 역량이 정확히 그 자리에서 쓰이기 때문입니다.',
          rows: 4
        },
        {
          id: 'q1_q4_2',
          label: 'Q4-2. 이 회사의 현재 과제나 방향성 중, 내 동기와 역량이 가장 잘 맞닿는 지점은?',
          hint: 'Q2에서 파악한 회사 정보와 연결 — 내가 기여할 수 있는 구체적 지점',
          guide: {
            description: '이 회사가 지금 어떤 과제를 안고 있는지 알고, 거기에 내가 어떻게 맞닿는지가 드러나야 합니다.',
            diagnosis: '즉석자가진단: "그 과제에 어떻게 기여할 수 있나요?"라고 물으면 준비한 역량과 연결해 답할 수 있는가?',
            helpQuestions: [
              'Q2에서 파악한 이 회사의 방향성이나 과제는?',
              '그 과제에 내 역량이 어떻게 연결되나요?',
              '이 회사가 아닌 다른 회사였다면 이 기여가 가능했을까요?'
            ],
            ifDifficult: 'Q2-3에서 쓴 회사 최근 이슈를 다시 읽고, 그 이슈 해결에 내 역량이 어떻게 쓰일 수 있는지 생각해보세요.',
            ifStillDifficult: '지금은 연결고리를 찾는 것만으로 충분합니다. 3라운드에서 더 구체적으로 다듬습니다.'
          },
          placeholder: '예: 귀사가 추진 중인 AI 기반 개인화 추천 프로젝트는 고객 행동 데이터를 정밀하게 분석하는 역량이 핵심입니다. 제가 준비해온 데이터 분석 역량과 정확히 겹치는 지점이며, 이 프로젝트에서 실질적으로 기여할 수 있다는 확신이 귀사에 지원한 가장 구체적인 이유입니다.',
          rows: 4
        }
      ]
    }
  ];

  const round2Questions = {
    1: [
      {
        id: 'q2_1_1',
        label: 'Q1 심화-1. 지금까지 살면서 가장 몰입했던 경험 3가지는 무엇인가요?',
        hint: '직무와 관련 없어도 됩니다 — 몰입 자체가 가치관의 단서입니다',
        guide: {
          description: '가치관을 직접 물으면 막힙니다. 대신 몰입 경험에서 역추적하면 자신의 가치관이 드러납니다.',
          diagnosis: '즉석자가진단: 세 경험의 공통점이 보이나요? 그 공통점이 바로 당신이 중요하게 생각하는 것입니다.',
          helpQuestions: [
            '시간 가는 줄 몰랐던 순간은 언제였나요?',
            '힘들었는데 계속하고 싶었던 일은 무엇인가요?',
            '세 경험의 공통점은 무엇인가요? (사람, 데이터, 창의, 설득, 분석 등)'
          ],
          ifDifficult: '직무와 무관한 경험도 괜찮습니다. 운동, 취미, 동아리 등 무엇이든 몰입했던 것을 떠올려보세요.',
          ifStillDifficult: '이 공통점이 Q1-2 가치관 답변의 핵심 재료가 됩니다.'
        },
        placeholder: '예: ① 학교 축제 기획 — 수백 명을 움직이는 아이디어가 통할 때 ② 동아리 SNS 운영 — 콘텐츠 반응 데이터를 보며 다음 글을 기획할 때 ③ 마케팅 팀 프로젝트 — 고객 데이터로 캠페인 전략을 수립할 때\n\n공통점: 데이터를 읽고 사람의 행동을 예측하거나 이끄는 과정이 즐거웠다.\n→ 이것이 마케팅 직무를 선택한 가치관적 이유가 됩니다.',
        rows: 5
      },
      {
        id: 'q2_1_2',
        label: 'Q1 심화-2. 이 직무에서 "절대 하기 싫은 일"이 있다면? 반대로 가장 하고 싶은 일은?',
        hint: '싫은 것을 먼저 찾으면 원하는 것이 선명해집니다',
        guide: {
          description: '하고 싶은 것보다 하기 싫은 것이 더 솔직하게 나옵니다. 두 가지를 대비하면 나만의 이유가 드러납니다.',
          diagnosis: '즉석자가진단: "절대 하기 싫은 일"과 "가장 하고 싶은 일"의 차이에서 왜 이 직무인지가 나오나요?',
          helpQuestions: [
            '이 직무에서 반복 작업만 하게 된다면 어떤 기분일까요?',
            '반대로 이 직무의 어떤 순간에 가장 보람을 느낄 것 같나요?',
            '다른 직무와 비교했을 때 이 직무만이 줄 수 있는 것은 무엇인가요?'
          ],
          ifDifficult: '이 직무에서 성공한 사람의 하루를 상상해보세요. 그 하루 중 어떤 장면이 가장 하고 싶나요?',
          ifStillDifficult: '다른 직무를 고려했다면 왜 그 직무가 아닌지도 함께 적어보세요.'
        },
        placeholder: '예: 절대 하기 싫은 것: 매번 같은 방식으로 같은 결과를 만드는 단순 반복\n가장 하고 싶은 것: 데이터를 보며 새로운 패턴을 발견하고 그것을 전략으로 만드는 과정\n\n→ 이 직무는 매번 다른 고객과 다른 시장을 분석하는 일이라 "반복 없는 발견"을 원하는 나에게 맞는 직무입니다.',
        rows: 5
      },
      {
        id: 'q2_1_3',
        label: 'Q1 심화-3. 관심이 생긴 후 실제로 어떤 행동을 했나요? 그 경험에서 무엇이 달라졌나요?',
        hint: '"관심이 생겼다"로 끝나면 안 됩니다 — 관심이 행동으로 이어진 구체적 증거',
        guide: {
          description: '지원동기에서 관심 이후의 행동 변화가 중요한 이유는, 막연한 관심이 아닌 실제로 이 직무를 탐색했다는 증거가 되기 때문입니다.',
          diagnosis: '즉석자가진단: "그래서 그 이후에 뭘 했나요?"라고 물으면 3가지 이상 즉답 가능한가?',
          helpQuestions: [
            '관심이 생긴 직후 처음으로 한 행동은? (검색, 책 구매, 유튜브 시청 등)',
            '그 이후 1~3개월 동안 어떤 변화가 있었나요?',
            '지금까지 이어지고 있는 변화나 습관이 있나요?'
          ],
          ifDifficult: '아주 작은 행동이라도 괜찮습니다. 검색, 책 구매, 영상 시청도 모두 행동입니다.',
          ifStillDifficult: '행동이 없다면 관심이 아닌 막연한 생각입니다. 지금부터라도 하나씩 시작해보세요.'
        },
        placeholder: '예: 그날 저녁 바로 "마케팅 직무란?"을 검색했고, 현직자 인터뷰 영상 3개를 봤습니다. 이후 관련 서적 2권을 구매했고, 지하철에서 광고를 볼 때마다 "어떤 타겟에게, 왜 이 메시지를?"이라고 분석하는 습관이 생겼습니다.',
        rows: 4
      },
      {
        id: 'q2_1_4',
        label: 'Q1 심화-4. 이 직무의 하루 일과를 구체적으로 묘사해보세요.',
        hint: '리서치 없이는 쓸 수 없는 내용이어야 합니다 — 상상이 아닌 탐구의 결과',
        guide: {
          description: '[입사후포부와 다른 점] 입사후포부: "이 직무에서 이렇게 일하겠습니다" → 실행 의지 / 지원동기: "이 직무가 실제로 이런 일을 한다는 것을 알고, 그 업무들이 내가 원하는 것이다" → 지원의 근거. 하루 일과를 묘사할 수 있다는 것은 직무를 진지하게 탐색했다는 증거입니다.',
          diagnosis: '즉석자가진단: "오전에는 주로 어떤 업무를 하나요?"라고 물으면 현직자 수준으로 답할 수 있는가?',
          helpQuestions: [
            '현직자 인터뷰에서 하루 루틴을 말한 내용이 있었나요?',
            '채용공고의 주요 업무 항목을 시간대별로 배치해보세요',
            '그 업무들 중 특히 하고 싶은 것과 도전적인 것은 무엇인가요?'
          ],
          ifDifficult: '현직자 인터뷰나 브런치 글을 참고하세요. 채용공고의 주요 업무를 시간대별로 배치해보세요.',
          ifStillDifficult: '상상으로 쓰지 마세요. 반드시 리서치 기반이어야 합니다.'
        },
        placeholder: '예: 현직자 인터뷰와 채용공고를 바탕으로 파악한 하루 일과:\n오전: 전날 캠페인 성과 데이터 분석 및 리포트 작성\n오전 후반: 팀 스탠드업 미팅, 당일 업무 공유\n점심 후: 콘텐츠 기획 또는 다음 캠페인 전략 수립\n오후: 광고 집행 및 실시간 성과 모니터링\n특히 하고 싶은 업무: 오전 데이터 분석 — 숫자에서 인사이트를 뽑는 과정이 가장 매력적입니다.',
        rows: 5
      },
      {
        id: 'q2_1_5',
        label: 'Q1 심화-5. 이 직무의 성장 경로를 어떻게 리서치했나요? 지금 당장 아래 방법으로 조사하고 작성하세요.',
        hint: '리서치 없이는 답할 수 없는 질문입니다 — 아래 방법을 따라 직접 조사하세요',
        guide: {
          description: '성장 경로를 모르면 Q1-3을 쓸 수 없습니다. 지금 30분 투자해서 조사하면 지원동기의 마무리 논리가 완성됩니다.',
          diagnosis: '즉석자가진단: "이 직무 5년차는 어떤 일을 하나요?"라고 물으면 구체적으로 답할 수 있게 됐나요?',
          helpQuestions: [
            '① 지원 직무명 + "시니어" 채용공고 검색 → 주요 업무 항목 읽기',
            '② 유튜브/브런치에서 "[직무명] 현직자 인터뷰" 검색 → 3편 이상 시청',
            '③ 링크드인에서 해당 직무 5년 이상 경력자 프로필 확인',
            '④ 위 리서치로 알게 된 것 중 "해보고 싶다"고 느낀 것은 무엇인가요?'
          ],
          ifDifficult: '지금 당장 시니어 채용공고를 검색해보세요. 30분이면 충분합니다.',
          ifStillDifficult: '리서치 없이 상상으로 쓰지 마세요. 면접관은 실제 경로를 알고 있습니다.'
        },
        placeholder: '예: 리서치 결과 (마케팅 기준):\n- 신입 1~2년: 캠페인 실행, 성과 데이터 분석, 콘텐츠 제작\n- 3~5년 (주니어): A/B 테스트 설계, 채널별 전략 수립, 퍼포먼스 개선\n- 5년 이상 (시니어): 브랜드 전략 전체 설계, 마케팅 팀 리드\n\n해보고 싶은 것: 고객 데이터를 분석해 브랜드 방향을 설계하는 시니어의 역할\n이유: 데이터가 창의적 판단을 뒷받침하는 순간이 가장 의미있기 때문에',
        rows: 5
      }
    ],
    2: [
      {
        id: 'q2_2_1',
        label: 'Q2 심화-1. 지금 당장 이 회사를 리서치하세요. 아래 순서대로 찾은 내용을 적으세요.',
        hint: '리서치를 먼저 해야 Q2 전체를 쓸 수 있습니다',
        guide: {
          description: '리서치 없이는 Q2를 쓸 수 없습니다. 아래 체크리스트 순서대로 30분 투자하면 구체적인 이유가 생깁니다.',
          diagnosis: '아래 항목 중 "다른 회사에는 없고 이 회사에만 있는 것"을 최소 2개 찾을 수 있나요?',
          helpQuestions: [
            '① 회사 홈페이지 → 뉴스룸 → 최근 1년 보도자료 3개 읽기',
            '② CEO 인터뷰 또는 대표 컬럼 → 회사가 중요하게 생각하는 가치 파악',
            '③ 블라인드 또는 링크드인 → 현직자들이 실제로 말하는 이 회사의 특징',
            '④ 경쟁사 채용공고와 비교 → 무엇이 다른가?',
            '⑤ 찾은 내용 중 내 Q1 답변(가치관·비전)과 연결되는 것은?'
          ],
          ifDifficult: '"업계 1위", "좋은 복지"는 어느 회사에나 해당하는 이유입니다. 이 회사에만 해당하는 것을 찾으세요.',
          ifStillDifficult: '최소 2가지 구체적인 사실(날짜, 수치, 사건 포함)을 찾아보세요.'
        },
        placeholder: '예: ① 최근 뉴스: 2024년 AI 기반 개인화 추천 시스템 자체 개발 시작 ② CEO 가치: "실험 문화 — 아이디어는 3일 안에 테스트한다" ③ 현직자 후기: "신입도 직접 데이터 쿼리하고 실험 설계에 참여" ④ 경쟁사와 차이: A사는 외주, 이 회사는 내부 팀이 모든 것을 직접 실행 ⑤ Q1 연결: "데이터로 직접 실험하고 싶다"는 비전과 정확히 일치',
        rows: 5
      },
      {
        id: 'q2_2_2',
        label: 'Q2 심화-2. 이 회사와 같은 직무를 하는 경쟁사를 2개 골라 비교해보세요. 그래도 이 회사를 선택한 이유는?',
        hint: '비교가 없으면 선택의 이유가 없습니다',
        guide: {
          description: '비교를 통해서만 "이 회사여야 하는 이유"가 선명해집니다. 경쟁사보다 못한 점도 솔직하게 인정하고, 그럼에도 선택한 이유를 찾으세요.',
          diagnosis: '즉석자가진단: "경쟁사도 좋은데 왜 여기인가요?"라는 질문에 구체적으로 답할 수 있나요?',
          helpQuestions: [
            '경쟁사 이름: _____과 _____',
            '각 회사의 장점은? (규모, 브랜드, 기술, 문화 등)',
            '이 회사의 단점은 무엇인가요? 그럼에도 선택한 이유는?',
            '내가 원하는 방식으로 일할 수 있는 환경이 이 회사에 있나요? 구체적으로?'
          ],
          ifDifficult: '객관적인 비교 자료(시장점유율, 성장률 등)를 찾아보세요.',
          ifStillDifficult: '단점도 인정하되, 그럼에도 이 회사를 선택한 이유를 명확히 하세요.'
        },
        placeholder: '예: A사: 규모 크고 브랜드 좋음 / 단점: 신입은 보조 역할만\nB사: 빠르게 성장 중 / 단점: 아직 데이터 인프라가 약함\n이 회사: 중간 규모지만 신입부터 실제 데이터와 실험에 참여 가능\n\n이 회사의 단점: 브랜드 인지도가 A사보다 낮음\n그래도 선택한 이유: "큰 회사에서 보조하는 것"보다 "작아도 직접 설계하고 실행하는 것"이 내 성장에 더 맞는다고 판단했기 때문',
        rows: 5
      },
      {
        id: 'q2_2_3',
        label: 'Q2 심화-3. 이 회사가 직면한 도전 과제나 업계 변화는 무엇이고, 거기에 내가 어떻게 연결되나요?',
        hint: '회사의 현재 과제를 파악하고 내 역량·관심과 연결 — Q4 기여 논리의 토대',
        guide: {
          description: '이 회사의 도전 과제를 파악하고 있다는 것은 두 가지를 보여줍니다. 첫째, 이 회사를 진지하게 리서치했다는 증거. 둘째, 막연히 좋아서 지원한 것이 아니라 이 회사가 맞닥뜨린 현실을 이해하고 함께하고 싶다는 의지.',
          diagnosis: '즉석자가진단: "이 회사가 지금 가장 어려운 부분은 뭐라고 생각해요?"라고 물으면 구체적으로 답할 수 있는가?',
          helpQuestions: [
            '업계 전체 트렌드에서 이 회사가 대응해야 하는 변화는 무엇인가요?',
            '이 회사의 최근 뉴스에서 도전 과제로 읽히는 것은?',
            '그 과제 중 내 역량이나 관심과 가장 직접적으로 맞닿는 것은?'
          ],
          ifDifficult: '부정적인 분석이 아니라 "이 과제에 기여하고 싶다"는 방향으로 연결하세요.',
          ifStillDifficult: '산업 리포트, 애널리스트 보고서, CEO 인터뷰를 찾아보세요.'
        },
        placeholder: '예: ① MZ세대 고객 확보: 기존 주 고객층 고령화, 새 세대 유입 필요\n② 데이터 기반 마케팅 고도화: AI 도입으로 경쟁사 대비 개인화 수준 격차 우려\n\n[내 연결 지점]\n① → MZ세대인 나는 또래 소비 심리를 데이터로 검증하는 시각이 있음\n② → SQL·Google Analytics로 고객 행동 분석 역량을 준비해온 방향과 정확히 일치',
        rows: 5
      }
    ],
    3: [
      {
        id: 'q2_3_1',
        label: 'Q3 심화-1. 지금까지 한 활동을 모두 나열하고, 각각 "왜 했는지"를 한 줄씩 써보세요.',
        hint: '"그냥 했다"거나 "스펙 때문에"는 답이 안 됩니다 — 진짜 이유를 찾아야 합니다',
        guide: {
          description: '활동마다 진짜 이유를 찾는 과정이 Q3의 핵심입니다. 이유를 찾으면 역량 준비의 방향성이 드러납니다.',
          diagnosis: '즉석자가진단: 각 활동의 이유가 이 직무를 하고 싶다는 동기와 연결되나요?',
          helpQuestions: [
            '활동을 시작하게 된 계기가 무엇이었나요? (강요였나요, 자발적이었나요?)',
            '그 활동을 하면서 기대한 것은 무엇이었나요?',
            '이유가 없는 활동은 과감하게 지원동기에서 빼세요. 이유 있는 활동만 남기세요.'
          ],
          ifDifficult: '"~하기 위해 ~을 했다" 문장 구조로 각 활동을 다시 써보세요.',
          ifStillDifficult: '목적이 없는 활동 나열은 스펙 나열처럼 보입니다.'
        },
        placeholder: '예: ① SQL 강의 수강 → 고객 데이터를 직접 추출하는 능력이 필요하다고 판단해서\n② Google Analytics 자격증 → 웹 행동 데이터를 읽는 법을 체계적으로 익히기 위해\n③ 마케팅 동아리 → 실제 브랜드 캠페인을 기획해보고 싶어서\n④ 브랜드 분석 블로그 운영 → 매주 하나씩 분석하며 보는 눈을 키우려고\n\n이유 없는 활동 (삭제): 토익 — 직무와 직접 연관 없음',
        rows: 5
      },
      {
        id: 'q2_3_2',
        label: 'Q3 심화-2. 가장 의미 있었던 활동 하나를 골라 "상황 → 내가 한 것 → 결과 → 배운 것" 순서로 써보세요.',
        hint: 'STAR 방식 — 숫자로 표현할 수 있는 결과가 있다면 반드시 포함',
        guide: {
          description: '하나를 깊게 쓰는 것이 여러 개를 얕게 나열하는 것보다 훨씬 강합니다.',
          diagnosis: '즉석자가진단: "그 경험에서 배운 것이 이 직무와 어떻게 연결되나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            'S(상황): 언제, 어디서, 어떤 상황이었나요?',
            'T(과제): 내가 맡은 역할이나 해결해야 할 문제는?',
            'A(행동): 구체적으로 무엇을 어떻게 했나요?',
            'R(결과): 숫자로 표현할 수 있는 결과는? 없다면 어떤 변화가 있었나요?'
          ],
          ifDifficult: '성과가 있었던 경험을 선택하세요. 숫자로 표현할 수 있는 결과가 있다면 더욱 좋습니다.',
          ifStillDifficult: '실패한 경험도 괜찮습니다. 그 경험에서 무엇을 배웠는지가 중요합니다.'
        },
        placeholder: '예: S: SNS 마케팅 프로젝트에서 콘텐츠 기획을 담당\nT: 3개월 안에 팔로워 1,000명, 게시물 평균 조회수 500회 달성\nA: 매주 콘텐츠 2개를 올리며 A/B 테스트 설계 — 썸네일 색상, 카피 길이 등 변수를 하나씩 바꾸며 클릭률 비교\nR: 클릭률 1.8배 향상, 팔로워 1,200명 달성\n배운 것: 감으로 만들던 콘텐츠가 데이터로 개선될 수 있다는 것\n→ 이것이 데이터 기반 마케팅을 배우게 된 직접적인 계기',
        rows: 5
      },
      {
        id: 'q2_3_3',
        label: 'Q3 심화-3. 현재 나의 준비 상태를 솔직하게 평가해보세요. 갖춘 것과 부족한 것은?',
        hint: '자만도, 과소평가도 아닌 객관적 평가 — 부족한 부분을 인정하는 것이 오히려 진정성을 높입니다',
        guide: {
          description: '솔직한 자기 평가는 지원동기에서 진정성의 증거입니다. 모든 역량을 다 갖췄다고 쓰는 것보다, 갖춘 것과 부족한 것을 명확히 구분하고 부족한 부분의 보완 계획을 함께 제시하는 것이 더 설득력 있습니다.',
          diagnosis: '즉석자가진단: "부족한 역량을 어떻게 채울 건가요?"라고 물으면 구체적 계획을 즉답할 수 있는가?',
          helpQuestions: [
            '증거가 있는 역량만 "갖췄다"고 쓰세요 (프로젝트, 자격증, 실습 경험 등)',
            '부족한 역량은 구체적으로 어떻게 보완할 계획인가요?',
            '이미 보완을 시작한 것이 있나요?'
          ],
          ifDifficult: '자만하지도, 과소평가하지도 말고 객관적으로 평가하세요.',
          ifStillDifficult: '"열심히 배우겠습니다"는 보완 계획이 아닙니다. 구체적인 방법과 기간이 있어야 합니다.'
        },
        placeholder: '예: [준비 상태 평가]\n✅ 갖춘 것: SQL 기초 완료, Google Analytics 자격증, SNS 캠페인 기획 경험\n⚠️ 기초 수준: Python 데이터 분석 (기초 문법은 알지만 실무 적용은 부족)\n❌ 부족한 것: 유료 광고 집행 경험\n\n[보완 계획]\nPython: 현재 강의 수강 중, 다음 달 완료 예정\n유료 광고: 입사 전까지 개인 프로젝트에 소액 광고비 투자해 직접 집행해볼 예정',
        rows: 5
      },
      {
        id: 'q2_3_4',
        label: 'Q3 심화-4. 준비한 역량이 이 회사의 어떤 업무에서 어떻게 쓰일지 구체적으로 그려보세요.',
        hint: '역량과 직무 업무를 1:1로 연결하는 연습 — 이 회사 채용공고를 열어두고 작성',
        guide: {
          description: '이 연결이 없으면 Q4(기여)를 쓸 수 없습니다. 지금 이 회사 채용공고의 주요 업무 항목을 열어두고 함께 작성하세요.',
          diagnosis: '즉석자가진단: "이 역량이 없었다면 이 업무를 할 수 없었을까요?"라는 질문에 "예"라고 답할 수 있나요?',
          helpQuestions: [
            '이 회사 채용공고의 주요 업무 목록을 확인하세요',
            '내가 준비한 역량 중 그 업무에 직접 연결되는 것은?',
            '"이 역량이 있어서 이 업무의 이 부분을 할 수 있다"는 문장으로 써보세요'
          ],
          ifDifficult: '연결이 안 되는 역량은 굳이 언급할 필요가 없습니다. 연결되는 역량만 남기세요.',
          ifStillDifficult: '"~하기 위해 ~을 준비했다" 문장 구조로 각 활동을 다시 써보세요.'
        },
        placeholder: '예: SQL 역량 → 귀사의 "고객 행동 데이터 분석 및 인사이트 도출" 업무\nGoogle Analytics → "채널별 퍼포먼스 측정 및 리포팅" 업무\nA/B 테스트 경험 → "마케팅 실험 설계 및 성과 측정" 업무\n\n→ "이 역량들이 귀사의 데이터 기반 마케팅 업무에 즉시 활용될 수 있다"는 Q4 기여의 근거가 됩니다.',
        rows: 5
      }
    ],
    4: [
      {
        id: 'q2_4_1',
        label: 'Q4 심화-1. Q1(동기) → Q3(역량) → Q4(기여)를 한 문장으로 연결해보세요.',
        hint: '"[이런 동기]가 있었기 때문에 [이 역량]을 준비했고, 그래서 [이 기여]가 가능하다"',
        guide: {
          description: '이 세 가지가 인과관계로 연결될 때 Q4가 완성됩니다. 각각 따로 쓰는 것이 아니라 하나의 문장으로 이어야 합니다.',
          diagnosis: '즉석자가진단: 연결 문장을 쓴 후, "그래서 왜요?"라고 물으면 막히지 않나요?',
          helpQuestions: [
            'Q1에서 쓴 동기 (가장 핵심적인 한 문장): ___',
            'Q3에서 쓴 역량 (가장 직접적으로 연결되는 것): ___',
            '"~기 때문에 ~을 준비했고, 따라서 ~할 수 있다"로 연결하세요'
          ],
          ifDifficult: '"열심히 하겠습니다"로 끝나면 안 됩니다. 동기와 역량이 기여의 이유가 되어야 합니다.',
          ifStillDifficult: '동기 한 줄, 역량 한 줄, 기여 한 줄을 각각 쓴 다음에 연결해보세요.'
        },
        placeholder: '예: [연결 문장 연습]\n동기: "데이터로 고객의 선택을 이해하고 싶다"\n역량: "SQL과 Google Analytics로 고객 행동 데이터를 추출·분석하는 능력"\n기여: "귀사의 고객 세그먼트를 정교화하는 데이터 분석 업무"\n\n완성 문장:\n"데이터로 고객의 선택을 이해하고 싶다는 동기가 있었기 때문에 SQL과 Google Analytics를 익혔고, 그 결과 귀사의 고객 행동 데이터 분석 업무에 즉시 기여할 수 있습니다."',
        rows: 5
      },
      {
        id: 'q2_4_2',
        label: 'Q4 심화-2. 이 회사가 지금 가장 집중하는 과제 하나를 골라 내 기여를 연결해보세요.',
        hint: 'Q2 리서치 결과와 Q3 역량을 연결 — 추상이 아닌 구체적인 지점',
        guide: {
          description: '"이 회사의 이 과제에 내 역량이 이렇게 연결된다"는 것이 보이면, 지원동기의 기여 논리가 완성됩니다.',
          diagnosis: '즉석자가진단: "다른 회사에 지원했다면 이 기여가 가능했을까요?"라고 물었을 때 "아니요"가 나와야 합니다.',
          helpQuestions: [
            'Q2에서 파악한 이 회사의 방향성이나 과제를 하나 적으세요',
            '그 과제를 해결하는 데 필요한 역량은 무엇인가요?',
            '내가 준비한 역량이 그것과 어떻게 겹치나요?'
          ],
          ifDifficult: '이 회사 채용공고의 주요 업무에서 힌트를 찾아보세요.',
          ifStillDifficult: 'Q2-3에서 쓴 도전 과제 분석과 Q3-4에서 쓴 역량 연결을 그대로 가져오세요.'
        },
        placeholder: '예: [이 회사의 과제] AI 기반 개인화 추천 시스템 고도화\n[필요 역량] 고객 행동 데이터 세그먼트 분석, A/B 테스트 설계\n[내 역량과의 연결] SQL로 행동 데이터 추출 + Google Analytics로 패턴 분석\n[구체적 역할] 추천 알고리즘에 활용할 고객 세그먼트 데이터를 정교화하는 분석 업무\n\n완성:\n"귀사의 개인화 추천 시스템 고도화 과정에서 고객 행동 세그먼트를 정교화하는 데이터 분석으로 직접 기여할 수 있습니다."',
        rows: 5
      }
    ]
  };


    const round3Questions = [
    {
      id: 'connect_q1',
      label: '연결 질문 1: 왜 이 직무인가 — 나만의 이유',
      hint: '단순한 관심이나 적성 이상으로, 가치관·비전·인생 목표와 이 직무가 어떻게 연결되는지 서술하세요. "공통점이 있다", "잘 맞는다" 수준을 넘어, 이 직무가 자신의 삶에서 어떤 의미를 갖는지까지 드러나야 합니다.',
      placeholder: '예: 마케팅을 선택한 것은 단순히 잘 맞아서가 아닙니다. 저는 사람들이 무언가를 선택하는 순간에 오랫동안 관심이 있었습니다. "왜 사람들은 이것을 선택하는가"를 데이터와 창의력으로 풀어내는 일을 평생 업으로 삼고 싶다는 확신이 이 직무를 선택한 나만의 이유입니다...',
      rows: 5,
      referenceSteps: [1],
      referenceQuestions: ['q1_1_1', 'q1_1_2', 'q1_6_2']
    },
    {
      id: 'connect_q2',
      label: '연결 질문 2: 왜 이 회사인가 — 같은 직무를 하는 수많은 회사 중에서',
      hint: '이 직무를 수행하는 회사는 많습니다. 복지나 규모가 아닌, 이 회사의 방향성·문화·사업 내용이 자신의 가치관이나 기여 비전과 어떻게 연결되는지가 핵심입니다. 리서치 없이는 쓸 수 없는 내용이어야 합니다.',
      placeholder: '예: 이 직무를 할 수 있는 회사는 많지만, 귀사를 선택한 이유는 하나입니다. 신입에게도 실제 데이터를 직접 다루고 실험을 설계하는 역할이 주어지는 환경이 귀사에 있습니다. 채용공고와 현직자 인터뷰로 이를 확인했고, 제가 하고 싶은 방식으로 일할 수 있는 환경이 귀사라는 확신이 결정적인 이유였습니다...',
      rows: 5,
      referenceSteps: [2],
      referenceQuestions: ['q1_4_1', 'q1_4_2', 'q1_4_3']
    },
    {
      id: 'connect_q3',
      label: '연결 질문 3: 무엇을 어떤 목적으로 준비했는가',
      hint: '역량을 나열하는 것이 아니라 "이 직무·이 회사를 위해 이런 역량이 필요하다고 판단했고, 그래서 이것을 이런 목적으로 준비했다"는 인과관계가 드러나야 합니다. "~하기 위해 ~을 준비했다"가 핵심 구조입니다.',
      placeholder: '예: 데이터로 고객의 선택을 설계하는 일을 하려면 고객 행동 데이터를 직접 추출하고 해석하는 능력이 핵심이라고 판단했습니다. 그래서 단순히 마케팅 공부를 시작한 것이 아니라, SQL을 먼저 익히고 이후 Google Analytics로 고객 행동을 읽는 법을 순서대로 학습했습니다. 스펙이 아닌 하고 싶은 일을 위한 준비였습니다...',
      rows: 5,
      referenceSteps: [3],
      referenceQuestions: ['q1_3_1', 'q1_5_2', 'q1_5_1']
    },
    {
      id: 'connect_q4',
      label: '연결 질문 4: 이 동기와 역량으로 어떻게 기여할 수 있는가',
      hint: '기여는 미래 계획의 선언이 아닙니다. "이런 동기가 있었고, 이런 역량을 준비했기 때문에 이 회사의 이런 과제에 이렇게 기여할 수 있다"는 인과의 결론이 되어야 합니다. 앞의 Q1~Q3이 자연스럽게 이 답으로 흘러와야 합니다.',
      placeholder: '예: 데이터로 고객의 선택을 이해하고 싶다는 동기에서 출발하여 SQL과 Google Analytics를 익혔고, 귀사의 고객 행동 데이터를 분석하여 캠페인 타겟 세그먼트를 정교화하는 업무에 즉시 기여할 수 있습니다. "도움이 될 것 같아서"가 아니라, 하고 싶었던 일을 위해 준비한 역량이 정확히 그 자리에서 쓰이기 때문입니다...',
      rows: 5,
      referenceSteps: [4],
      referenceQuestions: ['q1_q4_1', 'q1_q4_2', 'q1_4_3']
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
    
    // Q1: 왜 이 직무인가
    if (answers.connect_q1) parts.push(answers.connect_q1);
    else {
      if (answers.q1_1_1) parts.push(answers.q1_1_1);
      if (answers.q1_1_2) parts.push(answers.q1_1_2);
      if (answers.q1_6_2) parts.push(answers.q1_6_2);
    }

    // Q2: 왜 이 회사인가
    if (answers.connect_q2) parts.push('\n' + answers.connect_q2);
    else {
      if (answers.q1_4_1) parts.push('\n' + answers.q1_4_1);
      if (answers.q1_4_2) parts.push(answers.q1_4_2);
    }

    // Q3: 무엇을 왜 준비했는가
    if (answers.connect_q3) parts.push('\n' + answers.connect_q3);
    else {
      if (answers.q1_3_1) parts.push('\n' + answers.q1_3_1);
      if (answers.q1_5_2) parts.push(answers.q1_5_2);
      if (answers.q1_5_1) parts.push(answers.q1_5_1);
    }

    // Q4: 어떻게 기여할 수 있는가
    if (answers.connect_q4) parts.push('\n' + answers.connect_q4);
    else {
      if (answers.q1_q4_1) parts.push('\n' + answers.q1_q4_1);
      if (answers.q1_q4_2) parts.push(answers.q1_q4_2);
    }
    
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
    return `📋 원본 답변 모음\n\n[기본 정보]\n산업: ${basicInfo.industry || '-'}\n직무: ${basicInfo.position || '-'}\n회사: ${basicInfo.company || '-'}\n\n[Q1: 왜 이 직무인가]\nQ1-1 관심 계기: ${answers.q1_1_1 || '-'}\nQ1-2 가치관 연결: ${answers.q1_1_2 || '-'}\nQ1-3 성장 경로·해보고 싶은 것: ${answers.q1_6_2 || '-'}\n\n[Q2: 왜 이 회사인가]\nQ2-1 회사 차별점: ${answers.q1_4_1 || '-'}\nQ2-2 나와 맞는 이유: ${answers.q1_4_2 || '-'}\nQ2-3 최근 방향성·과제: ${answers.q1_4_3 || '-'}\n\n[Q3: 무엇을 왜 준비했는가]\nQ3-1 필요 역량 판단: ${answers.q1_3_1 || '-'}\nQ3-2 목적 있는 준비: ${answers.q1_5_2 || '-'}\nQ3-3 이 회사에서 쓰일 기대: ${answers.q1_5_1 || '-'}\n\n[Q4: 어떻게 기여할 수 있는가]\nQ4-1 동기+역량→기여: ${answers.q1_q4_1 || '-'}\nQ4-2 이 회사 과제와 연결: ${answers.q1_q4_2 || '-'}\n\n[3라운드 핵심 질문]\nQ1 왜 이 직무인가: ${answers.connect_q1 || '-'}\nQ2 왜 이 회사인가: ${answers.connect_q2 || '-'}\nQ3 무엇을 왜 준비했는가: ${answers.connect_q3 || '-'}\nQ4 어떻게 기여할 수 있는가: ${answers.connect_q4 || '-'}`;
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
                  <p className="text-sm text-gray-700">6개 STEP 핵심 질문에 답변 — 계기·가치관·회사 선택·역량 준비·기여·성장 경로 파악</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
                  <h3 className="font-bold text-gray-800 mb-2">2라운드: 약한 부분 보강</h3>
                  <p className="text-sm text-gray-700">부족한 STEP 선택 → 심화 질문으로 구체화 (생각 꺼내기 도구 제공)</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <h3 className="font-bold text-gray-800 mb-2">3라운드: 연결 및 완성</h3>
                  <p className="text-sm text-gray-700">4개 핵심 질문(왜 이 직무 / 왜 이 회사 / 무엇을 준비 / 어떻게 기여)으로 지원동기 전체를 하나의 인과 흐름으로 완성</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-3">핵심 원칙</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>진정성:</strong> 3초 자가진단 통과한 내용만</li>
                <li><strong>구체성:</strong> 숫자와 사실로 표현</li>
                <li><strong>검증 가능성:</strong> 가족도 인정할 사실만</li>
                <li><strong>연결성:</strong> 계기 → 가치관 → 회사 선택 → 역량 준비 → 기여가 하나의 인과 흐름으로 이어져야 합니다</li>
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
                  © 2026 CareerEngineer All Rights Reserved.
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
            <p className="text-center text-gray-600 mb-4">
              답변이 얕거나 더 구체화가 필요한 질문을 선택하여 2라운드에서 심화 질문에 답변하세요
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 text-sm text-amber-900 rounded">
              <p className="font-semibold mb-1">💡 선택 기준</p>
              <p>답변을 다시 읽었을 때 면접관이 <strong>"더 구체적으로 말해줄 수 있어요?"</strong>라고 물을 것 같은 STEP을 선택하세요.</p>
              <p className="mt-1 text-amber-700">특히 3초 자가진단을 통과하기 어려웠던 STEP을 우선 선택하세요.</p>
            </div>

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
              © 2026 CareerEngineer All Rights Reserved.
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

              {/* 첫 문장 가이드 */}
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4 rounded">
                <p className="text-sm font-bold text-amber-900 mb-2">💡 첫 문장 — 전체 주제문</p>
                <p className="text-sm text-amber-800 mb-1">구조: <strong>[계기 장면]</strong>에서 시작 → <strong>[가치관·성향]</strong> 자연스럽게 녹임 → <strong>[역량 준비]</strong> 연결 → <strong>[기여 + 지원]</strong> 마무리</p>
                <p className="text-xs text-amber-700 mt-2 border-t border-amber-200 pt-2">⚠️ 피해야 할 표현: "저는 ~한 사람입니다"로 시작 / "~에 관심이 생겨서 지원했습니다"처럼 이유가 없는 문장</p>
              </div>

              {/* 전체 흐름 가이드 + 실제 답변 참조 */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-bold text-purple-900 mb-3">📋 내 답변 활용 가이드 — 각 단락의 재료와 연결 방법</p>
                <p className="text-xs text-purple-700 mb-4">아래 답변들을 참고하여 위 텍스트를 수정하세요. 모든 답변을 쓸 필요는 없습니다. 각 단락에서 가장 구체적이고 선명한 것 하나씩 골라 연결하세요.</p>

                {/* Q1 */}
                <div className="bg-white border-l-4 border-purple-500 rounded p-3 mb-3">
                  <p className="text-xs font-bold text-purple-700 mb-2">Q1 — 왜 이 직무인가 (계기·가치관·해보고 싶은 것)</p>
                  <p className="text-xs text-gray-500 mb-1">👉 3라운드 연결Q1이 있으면 우선 사용. 없으면 아래에서 선택</p>
                  {answers.connect_q1 && (
                    <div className="bg-purple-50 rounded p-2 mb-2">
                      <p className="text-xs text-purple-600 font-semibold">✅ 연결Q1 (권장)</p>
                      <p className="text-xs text-gray-700 mt-1 whitespace-pre-wrap">{answers.connect_q1.substring(0, 150)}{answers.connect_q1.length > 150 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q1_1_1 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">관심 계기 (STEP1-Q1)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q1_1_1.substring(0, 100)}{answers.q1_1_1.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q1_6_2 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">해보고 싶은 것 (STEP6-Q2) → 지원 이유로 연결</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q1_6_2.substring(0, 100)}{answers.q1_6_2.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  <p className="text-xs text-purple-600 mt-2 italic">연결 문장 예시: "이 경험이 특별했던 이유는 단순한 흥미가 아니라..."</p>
                </div>

                {/* Q2 */}
                <div className="bg-white border-l-4 border-pink-500 rounded p-3 mb-3">
                  <p className="text-xs font-bold text-pink-700 mb-2">Q2 — 왜 이 회사인가 (리서치 기반, 다른 회사와 다른 이유)</p>
                  <p className="text-xs text-gray-500 mb-1">👉 3라운드 연결Q2가 있으면 우선 사용. 없으면 아래에서 가장 구체적인 것 하나 선택</p>
                  {answers.connect_q2 && (
                    <div className="bg-pink-50 rounded p-2 mb-2">
                      <p className="text-xs text-pink-600 font-semibold">✅ 연결Q2 (권장)</p>
                      <p className="text-xs text-gray-700 mt-1 whitespace-pre-wrap">{answers.connect_q2.substring(0, 150)}{answers.connect_q2.length > 150 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q1_4_1 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">회사 차별점 (STEP4-Q1)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q1_4_1.substring(0, 100)}{answers.q1_4_1.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q1_4_2 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">나와 맞는 이유 (STEP4-Q2)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q1_4_2.substring(0, 100)}{answers.q1_4_2.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  <p className="text-xs text-pink-600 mt-2 italic">연결 문장 예시: "이 직무를 할 수 있는 회사는 많지만, 귀사를 선택한 이유는..."</p>
                </div>

                {/* Q3 */}
                <div className="bg-white border-l-4 border-purple-500 rounded p-3 mb-3">
                  <p className="text-xs font-bold text-purple-700 mb-2">Q3 — 무엇을 왜 준비했는가 ("~하기 위해 ~을 했다" 구조)</p>
                  <p className="text-xs text-gray-500 mb-1">👉 3라운드 연결Q3가 있으면 우선 사용. 없으면 STEP5 답변을 목적 중심으로 다듬어 사용</p>
                  {answers.connect_q3 && (
                    <div className="bg-purple-50 rounded p-2 mb-2">
                      <p className="text-xs text-purple-600 font-semibold">✅ 연결Q3 (권장)</p>
                      <p className="text-xs text-gray-700 mt-1 whitespace-pre-wrap">{answers.connect_q3.substring(0, 150)}{answers.connect_q3.length > 150 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q1_5_1 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">기여 비전과 준비 (STEP5-Q1)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q1_5_1.substring(0, 100)}{answers.q1_5_1.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q1_5_2 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">목적 있는 준비 (STEP5-Q2)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q1_5_2.substring(0, 100)}{answers.q1_5_2.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  <p className="text-xs text-purple-600 mt-2 italic">연결 문장 예시: "그 확신이 생긴 이후부터 본격적으로 준비를 시작했습니다..."</p>
                </div>

                {/* Q4 */}
                <div className="bg-white border-l-4 border-pink-500 rounded p-3 mb-2">
                  <p className="text-xs font-bold text-pink-700 mb-2">Q4 — 어떻게 기여할 수 있는가 (동기+역량의 인과 결론, 입사후포부 아님)</p>
                  <p className="text-xs text-gray-500 mb-1">👉 3라운드 연결Q4가 있으면 우선 사용. "열심히 하겠다"가 아닌 동기+역량의 자연스러운 결론이어야 합니다</p>
                  {answers.connect_q4 && (
                    <div className="bg-pink-50 rounded p-2 mb-2">
                      <p className="text-xs text-pink-600 font-semibold">✅ 연결Q4 (권장)</p>
                      <p className="text-xs text-gray-700 mt-1 whitespace-pre-wrap">{answers.connect_q4.substring(0, 150)}{answers.connect_q4.length > 150 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q1_q4_1 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">기여 방식 (Q4-1)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q1_q4_1.substring(0, 100)}{answers.q1_q4_1.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  <p className="text-xs text-pink-600 mt-2 italic">연결 문장 예시: "이렇게 준비해온 역량이 귀사의 [과제]에 이런 방식으로 연결됩니다..."</p>
                </div>
              </div>

              {/* 수정 전 최종 확인 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-bold text-blue-900 mb-3">✅ 수정 전 최종 확인 — 통과 못 하면 해당 답변으로 돌아가세요</p>
                <div className="space-y-3">

                  {/* 첫 문장 */}
                  <div className="bg-white rounded p-3 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-800 mb-1">① 첫 문장에 계기 + 가치관 + 역량 + 기여가 담겨 있는가?</p>
                    <p className="text-xs text-gray-500">통과 못 하면 → <span className="text-purple-600 font-semibold">Q1-1(계기)</span> + <span className="text-purple-600 font-semibold">Q3-4(기여 비전)</span> + <span className="text-pink-600 font-semibold">STEP4-Q1(회사)</span>을 합쳐서 다시 써보세요</p>
                    {answers.q1_1_1 && <p className="text-xs text-gray-600 mt-1 bg-gray-50 rounded p-1 italic">"{answers.q1_1_1.substring(0, 60)}{answers.q1_1_1.length > 60 ? '...' : ''}" — STEP1-Q1</p>}
                  </div>

                  {/* 인과 흐름 */}
                  <div className="bg-white rounded p-3 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-800 mb-1">② Q1(직무) → Q2(회사) → Q3(준비) → Q4(기여)가 인과관계로 이어지는가?</p>
                    <p className="text-xs text-gray-500">통과 못 하면 → 각 단락 사이에 연결 문장이 있는지 확인하세요. 위 내 답변 활용 가이드의 <span className="text-purple-600 font-semibold">연결 문장 예시</span>를 참고하세요</p>
                    {answers.connect_q1 && <p className="text-xs text-gray-600 mt-1 bg-purple-50 rounded p-1 italic">Q1: "{answers.connect_q1.substring(0, 50)}{answers.connect_q1.length > 50 ? '...' : ''}" — 3라운드 연결Q1</p>}
                    {answers.connect_q4 && <p className="text-xs text-gray-600 mt-1 bg-pink-50 rounded p-1 italic">Q4: "{answers.connect_q4.substring(0, 50)}{answers.connect_q4.length > 50 ? '...' : ''}" — 3라운드 연결Q4</p>}
                  </div>

                  {/* 회사·직무 맞춤 */}
                  <div className="bg-white rounded p-3 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-800 mb-1">③ 이 회사, 이 직무가 아니면 쓸 수 없는 내용인가?</p>
                    <p className="text-xs text-gray-500">통과 못 하면 → <span className="text-pink-600 font-semibold">Q2-1(회사 차별점)</span>과 <span className="text-pink-600 font-semibold">Q2-2(나와 맞는 이유)</span>를 다시 확인하세요</p>
                    {answers.q1_4_1 && <p className="text-xs text-gray-600 mt-1 bg-gray-50 rounded p-1 italic">"{answers.q1_4_1.substring(0, 60)}{answers.q1_4_1.length > 60 ? '...' : ''}" — STEP4-Q1</p>}
                  </div>

                  {/* 마지막 문장 */}
                  <div className="bg-white rounded p-3 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-800 mb-1">④ 마지막 문장이 "열심히 하겠습니다"가 아닌 동기+역량의 결론인가?</p>
                    <p className="text-xs text-gray-500">통과 못 하면 → <span className="text-pink-600 font-semibold">3라운드 연결Q4</span>를 다시 보거나, STEP5-Q2(역량 준비 목적)와 STEP4-Q3(회사 과제)를 연결해보세요</p>
                    {answers.connect_q4 && <p className="text-xs text-gray-600 mt-1 bg-pink-50 rounded p-1 italic">"{answers.connect_q4.substring(0, 60)}{answers.connect_q4.length > 60 ? '...' : ''}" — 3라운드 연결Q4</p>}
                  </div>

                </div>
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
                © 2026 CareerEngineer All Rights Reserved.
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
        title: '3라운드: 핵심 질문으로 완성',
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
                    <div className={`border-l-4 p-4 mb-4 rounded-r-lg ${currentPhase === 'round3' ? 'bg-purple-50 border-purple-400' : 'bg-indigo-50 border-indigo-400'}`}>
                      <p className={`text-sm font-semibold mb-1 ${currentPhase === 'round3' ? 'text-purple-900' : 'text-indigo-900'}`}>
                        {currentPhase === 'round3' ? '📚 아래 답변들을 읽고, 하나의 흐름으로 연결해서 위 질문에 답하세요' : '📚 참고: 이전 답변'}
                      </p>
                      {currentPhase === 'round3' && (
                        <p className="text-xs text-purple-700 mb-3">모든 내용을 다 쓸 필요는 없습니다. 각 답변에서 가장 핵심적인 부분을 골라 자연스럽게 연결하세요.</p>
                      )}
                      <div className="space-y-3">
                        {q.referenceQuestions.map((refId) => {
                          const allQuestions = round1Steps.flatMap(s => s.questions || []);
                          const refQuestion = allQuestions.find(q => q?.id === refId);
                          if (!refQuestion || !answers[refId]) return null;
                          const charLimit = currentPhase === 'round3' ? 300 : 150;
                          return (
                            <div key={refId} className={`rounded text-sm p-3 ${currentPhase === 'round3' ? 'bg-white border border-purple-100' : 'bg-white'}`}>
                              <p className={`font-semibold mb-1 text-xs ${currentPhase === 'round3' ? 'text-purple-700' : 'text-gray-700'}`}>
                                {refQuestion.label}
                              </p>
                              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {answers[refId]?.substring(0, charLimit)}{answers[refId]?.length > charLimit ? '...' : ''}
                              </p>
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
            © 2026 CareerEngineer All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MotivationWorkbook;