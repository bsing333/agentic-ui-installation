
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

type QuestionStep = {
  question: string;
  description?: string;
  type: 'radio' | 'text';
  options?: string[];
};

const questions: QuestionStep[] = [
  {
    question: "How familiar are you with Agentic UI?",
    description: "Agentic UI refers to interfaces that act autonomously on behalf of users.",
    type: 'radio',
    options: [
      "Not at all familiar",
      "Slightly familiar",
      "Moderately familiar",
      "Very familiar",
      "Expert level"
    ]
  },
  {
    question: "Have you used any AI agents in your daily work?",
    description: "Examples include AI assistants, automated content generation, or data analysis tools.",
    type: 'radio',
    options: [
      "Never",
      "Rarely",
      "Sometimes",
      "Frequently",
      "All the time"
    ]
  },
  {
    question: "What capabilities would you expect from an ideal Agentic UI?",
    type: 'text'
  },
  {
    question: "What challenges or concerns do you have about Agentic interfaces?",
    type: 'text'
  },
  {
    question: "How do you envision the future relationship between humans and AI agents?",
    description: "Think about collaboration, delegation, and integration into daily life.",
    type: 'text'
  }
];

const AgenticSurvey = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleRadioChange = (value: string) => {
    setAnswers({ ...answers, [currentStep]: value });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers({ ...answers, [currentStep]: e.target.value });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit survey
      setSubmitted(true);
      toast({
        title: "Survey Submitted",
        description: "Thank you for sharing your experience with Agentic UI!",
      });
      console.log("Survey answers:", answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentQuestion = questions[currentStep];
  const canProceed = answers[currentStep] !== undefined && answers[currentStep].trim() !== '';

  if (submitted) {
    return (
      <Card className="w-full max-w-lg animate-fade-in bg-black/30 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="font-camera text-3xl text-center text-white mb-2">Thank You</CardTitle>
          <CardDescription className="text-center text-lg text-white/80">
            Your insights about Agentic UI experiences are valuable in shaping the future of human-AI collaboration.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-white/70 mb-6">
            We're constantly exploring new ways to make AI interfaces more intuitive, helpful, and aligned with human needs.
          </p>
          <Button 
            onClick={() => {
              setSubmitted(false);
              setCurrentStep(0);
              setAnswers({});
            }} 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            Start Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg animate-fade-in bg-black/30 backdrop-blur-sm border border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/60">Question {currentStep + 1} of {questions.length}</span>
          <span className="text-sm font-semibold text-primary">{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-white/10 h-1 rounded-full">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <CardTitle className="font-camera text-2xl mt-4 text-white">{currentQuestion.question}</CardTitle>
        {currentQuestion.description && (
          <CardDescription className="text-white/70">{currentQuestion.description}</CardDescription>
        )}
      </CardHeader>
      
      <CardContent>
        {currentQuestion.type === 'radio' && (
          <RadioGroup 
            value={answers[currentStep] || ''} 
            onValueChange={handleRadioChange}
            className="flex flex-col gap-3"
          >
            {currentQuestion.options?.map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${i}`} className="border-white/30 text-white" />
                <Label htmlFor={`option-${i}`} className="text-white">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
        
        {currentQuestion.type === 'text' && (
          <Textarea 
            value={answers[currentStep] || ''} 
            onChange={handleTextChange} 
            placeholder="Share your thoughts..."
            className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-white/40"
          />
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleBack}
          disabled={currentStep === 0}
          className="border-white/20 text-white hover:bg-white/10"
        >
          Back
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={!canProceed}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
        >
          {currentStep === questions.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgenticSurvey;
