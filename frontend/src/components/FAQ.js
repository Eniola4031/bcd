import { useState } from "react";

const FAQ = () => {
  // Define FAQ items as an array of objects, each containing a question and answer
  const faqItems = [
    {
      question: "What cryptocurrencies can I use for payments on the platform?",
      answer:
        "You can use Etherlink's native cryptocurrency for payments on our platform. We currently support transactions in Etherlink (ETL) tokens.",
    },
    {
      question:
        "How long does it take for payments to be processed after completing a task?",
      answer:
        "Payments are processed automatically upon task completion and verification. You should receive your payment in Etherlink tokens shortly after your task has been marked as completed.",
    },
    {
      question:
        "Is there a minimum withdrawal amount for earnings on the platform?",
      answer:
        "Yes, there is a minimum withdrawal amount for earnings on our platform. Currently, the minimum withdrawal threshold is set at 0.1 Etherlink tokens. You can withdraw your earnings once you reach this threshold.",
    },
    {
      question:
        "Are there any fees associated with posting tasks or completing tasks on the platform?",
      answer:
        "Posting tasks on our platform is free for users. However, a small fee is deducted from task payments to cover transaction costs and support platform maintenance. The fee is automatically deducted during the payment processing.",
    },
    {
      question:
        "How are disputes resolved between task creators and task performers?",
      answer:
        "We have a dedicated dispute resolution process in place to handle disputes between task creators and task performers. If a dispute arises, both parties can submit their evidence and arguments, and our team will carefully review the case to reach a fair resolution.",
    },
  ];

  // State to keep track of which FAQ items are expanded
  const [expandedItems, setExpandedItems] = useState([]);

  // Function to toggle expansion of FAQ item
  const toggleExpand = (index) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((item) => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  return (
    <div className='faq-container container'>
      <div className='faq'>
        <i className='fa-solid fa-star'></i>
        <h2>FAQs</h2>
      </div>
      <div className='faq-list col'>
        {faqItems.map((item, index) => (
          <div className='faq-item' onClick={() => toggleExpand(index)} key={index}>
            <div className='faq-quest-ans'>
              <h3>{item.question}</h3>
              <p
                className={`ans ${expandedItems.includes(index) ? "show" : ""}`}>
                {item.answer}
              </p>
            </div>
            <i className={`fa-solid ${expandedItems.includes(index) ? "fa-minus" : "fa-plus"}`}></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
