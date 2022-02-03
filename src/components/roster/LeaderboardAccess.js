import React from "react";

export const LeaderboardAccess = ({ student, stateSetter }) => (
    <>
        <label htmlFor="lbBox">
            Leaderboard Access
            <input type="checkbox" checked={student.leaderboardAccess} />
        </label>
    </>
);
