"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2 } from "lucide-react";

interface UserSearchResult {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface UserSearchInputProps {
  onSelect: (user: UserSearchResult) => void;
}

function useUserSearch(query: string): {
  results: UserSearchResult[];
  isLoading: boolean;
  error: Error | null;
} {
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    const t = setTimeout(() => {
      // Mock results for development
      setResults([
        { id: "1", name: "Anthony Jones", email: "anthony@example.com" },
        { id: "2", name: "Chiamaka Nwosu", email: "chiamaka@example.com" },
      ]);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(t);
  }, [query]);

  return { results, isLoading, error: null };
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function UserSearchInput({ onSelect }: UserSearchInputProps) {
  const [rawQuery, setRawQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRawQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(val.trim());
    }, 300);
  };

  const { results, isLoading } = useUserSearch(debouncedQuery);
  const showResults = debouncedQuery.length >= 3;
  const showEmpty = showResults && !isLoading && results.length === 0;

  return (
    <div className="w-full">
      {/* Search input */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={rawQuery}
          onChange={handleChange}
          placeholder="Search by name or email..."
          autoFocus
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
          aria-label="Search users"
        />
        {isLoading && (
          <Loader2
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin"
          />
        )}
      </div>

      {/* Hint */}
      {rawQuery.length > 0 && rawQuery.length < 3 && (
        <p className="text-xs text-muted-foreground mt-2 px-1">
          Type at least 3 characters to search
        </p>
      )}

      {/* Results */}
      {showResults && (
        <div className="mt-3 flex flex-col gap-1 max-h-60 overflow-y-auto">
          {showEmpty ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No users found
            </p>
          ) : (
            results.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => onSelect(user)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors text-left w-full"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-9 w-9 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-semibold shrink-0">
                    {getInitials(user.name)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
