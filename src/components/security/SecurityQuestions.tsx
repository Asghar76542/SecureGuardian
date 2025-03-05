
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const securityQuestionOptions = [
  "What was your childhood nickname?",
  "In what city did you meet your spouse/significant other?",
  "What is the name of your favorite childhood friend?",
  "What street did you live on in third grade?",
  "What is the middle name of your oldest child?",
  "What is your oldest sibling's birthday month and year?",
  "What is the middle name of your youngest child?",
  "What is your oldest cousin's first and last name?",
  "What was the name of your first stuffed animal?",
  "In what city or town did your parents meet?"
];

const SecurityQuestions = () => {
  const [questions, setQuestions] = useState([
    { question: '', answer: '' },
    { question: '', answer: '' },
    { question: '', answer: '' }
  ]);

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = value;
    setQuestions(newQuestions);
  };

  const handleSave = () => {
    // Validate questions and answers
    const isValid = questions.every(q => q.question && q.answer);
    
    if (!isValid) {
      toast.error('Please select all questions and provide answers');
      return;
    }
    
    // In a real app, save to the database
    toast.success('Security questions saved successfully');
    console.log('Security questions saved:', questions);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Security Questions</CardTitle>
        <CardDescription>
          Set up security questions to help recover your account in case you forget your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={`question-${index}`}>Question {index + 1}</Label>
              <Select 
                value={q.question} 
                onValueChange={(value) => handleQuestionChange(index, value)}
              >
                <SelectTrigger id={`question-${index}`}>
                  <SelectValue placeholder="Select a security question" />
                </SelectTrigger>
                <SelectContent>
                  {securityQuestionOptions.map((option, optIndex) => (
                    <SelectItem 
                      key={optIndex} 
                      value={option}
                      disabled={questions.some((qItem, qIndex) => qIndex !== index && qItem.question === option)}
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Label htmlFor={`answer-${index}`}>Answer</Label>
              <Input 
                id={`answer-${index}`} 
                value={q.answer} 
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder="Your answer"
              />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Security Questions</Button>
      </CardFooter>
    </Card>
  );
};

export default SecurityQuestions;
