"use client";
import React from "react";
import { useSaved } from "@/app/_contexts/SavedContext";
import CardSection from "@/components/CardSection";
import EmptySection from "@/components/user/notifications/EmptySection";
const SavedList = () => {
	const { saved } = useSaved();
	return (
		<div>
			{saved.length ? (
				<CardSection displayData={saved} />
			) : (
				<EmptySection
					title="No saved publications yet"
					text="Materials you saved will appear here for easy access"
				/>
			)}
		</div>
	);
};

export default SavedList;
