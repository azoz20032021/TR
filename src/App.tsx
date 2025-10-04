import  { useEffect, useState, type JSX } from "react";
import "./App.css";

type Question = {
  id: number;
  text: string;
  options: string[];
  answer: number;
};

// أسئلة لكل مستوى
const levels: Question[][] = [
  // Level 1
  [
    { id: 1, text: "من هو خاتم الأنبياء؟", options: ["عيسى", "محمد ﷺ", "إبراهيم", "نوح"], answer: 1 },
    { id: 2, text: "كم عدد أركان الإسلام؟", options: ["3", "4", "5", "6"], answer: 2 },
    { id: 3, text: "كم عدد أركان الإيمان؟", options: ["4", "5", "6", "7"], answer: 2 },
    { id: 4, text: "ما هو أول مسجد بُني في الإسلام؟", options: ["المسجد الحرام", "المسجد الأقصى", "مسجد قباء", "المسجد النبوي"], answer: 2 },
    { id: 5, text: "في أي شهر يصوم المسلمون؟", options: ["رمضان", "شوال", "ذو الحجة", "محرم"], answer: 0 },
    { id: 6, text: "كم عدد الصلوات المفروضة في اليوم؟", options: ["3", "4", "5", "6"], answer: 2 },
    { id: 7, text: "ما هي أطول سورة في القرآن؟", options: ["البقرة", "آل عمران", "النساء", "الفاتحة"], answer: 0 },
    { id: 8, text: "ما اسم والدة النبي محمد ﷺ؟", options: ["خديجة", "آمنة", "فاطمة", "هاجر"], answer: 1 },
    { id: 9, text: "في أي مدينة وُلد النبي ﷺ؟", options: ["المدينة", "مكة", "الطائف", "بدر"], answer: 1 },
    { id: 10, text: "كم مرة ذُكر اسم 'محمد' في القرآن؟", options: ["2", "3", "4", "5"], answer: 2 },
    { id: 11, text: "ما هي كلمة الدخول للمسجد؟", options: ["بسم الله", "اللهم افتح لي أبواب رحمتك", "سبحان الله", "لا إله إلا الله"], answer: 1 },
    { id: 12, text: "كم عدد أيام شهر رمضان عادة؟", options: ["29 أو 30", "28", "31", "27"], answer: 0 },
    { id: 13, text: "ما الركن الرابع من أركان الإسلام؟", options: ["الصلاة", "الزكاة", "الصوم", "الشهادة"], answer: 2 },
    { id: 14, text: "ما السورة التي تُسمى 'قلب القرآن'؟", options: ["الكهف", "يس", "الرحمن", "الفاتحة"], answer: 1 },
    { id: 15, text: "من هو أول الخلفاء الراشدين؟", options: ["عمر", "علي", "عثمان", "أبو بكر"], answer: 3 },
    { id: 16, text: "كم عدد آيات سورة الفاتحة؟", options: ["5", "6", "7", "8"], answer: 2 },
    { id: 17, text: "ما اسم ليلة نزول القرآن؟", options: ["ليلة القدر", "ليلة المعراج", "النصف من شعبان", "ليلة الإسراء"], answer: 0 },
    { id: 18, text: "في أي يوم تُؤدى صلاة الجمعة؟", options: ["الخميس", "الجمعة", "السبت", "الأحد"], answer: 1 },
    { id: 19, text: "كم عدد سور القرآن الكريم؟", options: ["112", "113", "114", "115"], answer: 2 },
    { id: 20, text: "ما أول سورة في المصحف؟", options: ["البقرة", "الفاتحة", "آل عمران", "الناس"], answer: 1 },
  ],

  // Level 2
  [
    { id: 1, text: "كم كان عمر النبي ﷺ عند وفاته؟", options: ["60", "61", "62", "63"], answer: 3 },
    { id: 2, text: "من هو الصحابي الذي بشره النبي بالجنة وهو حي؟", options: ["عمر", "بلال", "عثمان", "طلحة"], answer: 1 },
    { id: 3, text: "كم عدد الغزوات التي شارك فيها النبي ﷺ؟", options: ["19", "23", "25", "27"], answer: 3 },
    { id: 4, text: "في أي عام هاجر النبي ﷺ إلى المدينة؟", options: ["610م", "622م", "630م", "632م"], answer: 1 },
    { id: 5, text: "ما السورة التي تبدأ بكلمة (قد)؟", options: ["الرحمن", "المجادلة", "المؤمنون", "الممتحنة"], answer: 2 },
    { id: 6, text: "كم عدد أسماء الله الحسنى؟", options: ["99", "100", "97", "90"], answer: 0 },
    { id: 7, text: "من هو أول من أسلم من الصبيان؟", options: ["علي بن أبي طالب", "زيد", "بلال", "عثمان"], answer: 0 },
    { id: 8, text: "ما هي السورة التي لا تبدأ بالبسملة؟", options: ["التوبة", "الأنفال", "الجمعة", "الإخلاص"], answer: 0 },
    { id: 9, text: "كم سنة استمر الوحي على النبي ﷺ؟", options: ["20", "21", "22", "23"], answer: 3 },
    { id: 10, text: "في أي ليلة أُسري بالنبي ﷺ؟", options: ["ليلة القدر", "ليلة المعراج", "ليلة الإسراء", "ليلة الجمعة"], answer: 2 },
  ],

  // Level 3
  [
    { id: 1, text: "كم عدد سور المدينة؟", options: ["5", "6", "7", "8"], answer: 2 },
    { id: 2, text: "من الذي جمع القرآن في مصحف واحد؟", options: ["أبو بكر", "عمر", "عثمان", "علي"], answer: 2 },
    { id: 3, text: "من هو الملك الموكل بنزول المطر؟", options: ["مالك", "إسرافيل", "جبريل", "ميكائيل"], answer: 3 },
  ],

  // Level 4
  [
    { id: 1, text: "كم عدد ركعات صلاة الليل؟", options: ["8", "11", "13", "20"], answer: 1 },
    { id: 2, text: "ما اسم الصحابي الذي جمع القرآن بعد وفاة النبي ﷺ؟", options: ["أبو بكر", "عمر", "عثمان", "زيد"], answer: 2 },
  ],

  // Level 5
  [
    { id: 1, text: "من كان ملك الحبشة عندما هاجر المسلمون إليها؟", options: ["المنذر", "النجاشي", "هرقل", "المأمون"], answer: 1 },
    { id: 2, text: "كم عدد أيام الحج؟", options: ["3", "4", "5", "6"], answer: 2 },
  ],
];

// عدد الإجابات المطلوبة لاجتياز كل مستوى
const passMarks = [16, 8, 3, 2, 2];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App(): JSX.Element {
  const [level, setLevel] = useState<number>(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Array<number | null>>([]);
  const [result, setResult] = useState<{ correct: number; incorrect: number } | null>(null);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    const qs = shuffle(levels[level - 1]);
    setQuestions(qs);
    setAnswers(Array(qs.length).fill(null));
    setResult(null);
    setCanProceed(false);
  }, [level]);

  function handleSelect(i: number, oi: number) {
    const next = [...answers];
    next[i] = oi;
    setAnswers(next);
  }

  function handleSubmit() {
    if (answers.some((a) => a === null)) {
      alert("الرجاء الإجابة على جميع الأسئلة أولاً.");
      return;
    }

    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });

    setResult({ correct, incorrect: questions.length - correct });

    // تحقق من إمكانية الانتقال للمستوى التالي
    if (correct >= passMarks[level - 1] && level < 5) {
      setCanProceed(true);
    }
  }

  function handleNextLevel() {
    setLevel(level + 1);
  }

  function handleReset() {
    const qs = shuffle(levels[level - 1]);
    setQuestions(qs);
    setAnswers(Array(qs.length).fill(null));
    setResult(null);
    setCanProceed(false);
  }

  return (
    <div className="quiz-root" dir="rtl">
      <h1>🕌 المستوى {level} - اختبار في الدين الإسلامي</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        {questions.map((q, i) => (
          <fieldset className="question" key={q.id}>
            <legend>{i + 1}. {q.text}</legend>
            <div className="options">
              {q.options.map((opt, oi) => {
                const isChecked = answers[i] === oi;
                const showResult = result !== null;
                const isCorrect = oi === q.answer;
                const isWrong = showResult && isChecked && !isCorrect;
                const className = showResult
                  ? isCorrect
                    ? "option correct"
                    : isWrong
                    ? "option incorrect"
                    : "option"
                  : "option";
                return (
                  <label key={oi} className={className}>
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={isChecked}
                      onChange={() => handleSelect(i, oi)}
                    />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}

        <div className="controls">
          {!canProceed && <button className="submit" onClick={handleSubmit}>عرض النتيجة</button>}
          {canProceed && <button className="submit" onClick={handleNextLevel}>⬆️ الانتقال للمستوى التالي</button>}
          <button className="reset" onClick={handleReset}>إعادة</button>
        </div>
      </form>

      {result && (
        <div className="result">
          <p>✅ الصحيحة: {result.correct}</p>
          <p>❌ الخاطئة: {result.incorrect}</p>
          {level < 5 && result.correct < passMarks[level - 1] &&
            <p>❗ تحتاج على الأقل {passMarks[level - 1]} إجابة صحيحة للانتقال للمستوى التالي.</p>}
          {level === 5 && <p>🏆 تهانينا! لقد أكملت جميع المستويات!</p>}
        </div>
      )}
    </div>
  );
}
