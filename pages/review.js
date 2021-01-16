import ReviewForm from '../frontend/components/ReviewForm.js';

export default function Review({language, transactionState, setTransactionState}) {
  return (
    <div>
      <ReviewForm
        language={language}
        transactionState={transactionState}
        setTransactionState={setTransactionState}
      />
    </div>
  );
}
