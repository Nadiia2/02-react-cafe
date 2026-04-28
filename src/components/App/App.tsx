import css from "./App.module.css";
import CafeInfo from "../CafeInfo/CafeInfo";
import type { VoteType } from "../../types/votes";
import { useState } from "react";
import type { Votes } from "../../types/votes";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import { Notification } from "../Notification/Notification";

export default function App() {
  const [vote, setVote] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  function handleVote(type: VoteType) {
    setVote({ ...vote, [type]: vote[type] + 1 });
  }

  function resetVotes() {
    const resVotes: Votes = {
      good: 0,
      bad: 0,
      neutral: 0,
    };
    setVote(resVotes);
  }
  const totalVotes = vote.good + vote.neutral + vote.bad;
  const positiveRate = totalVotes > 0 ? (vote.good / totalVotes) * 100 : 0;
  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0 ? true : false}
      />
      {totalVotes > 0 ? (
        <VoteStats
          votes={vote}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
