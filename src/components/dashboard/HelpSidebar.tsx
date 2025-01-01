import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export const HelpSidebar = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        toast({
          title: "Error loading FAQs",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setFaqs(data || []);
      }
    };

    fetchFaqs();
  }, []);

  const ContactForm = () => (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="block text-sm font-medium mb-2">Subject</label>
        <Input placeholder="How can we help?" />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Message</label>
        <Textarea placeholder="Describe your issue..." className="min-h-[100px]" />
      </div>
      
      <Button type="submit">Send Message</Button>
    </form>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Help Center</h2>
        <Button
          variant="outline"
          onClick={() => setShowContactForm(!showContactForm)}
        >
          {showContactForm ? "View FAQs" : "Contact Us"}
        </Button>
      </div>

      {showContactForm ? (
        <ContactForm />
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};