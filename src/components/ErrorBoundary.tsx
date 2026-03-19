import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "An unexpected error occurred.";
      let isFirestoreError = false;

      try {
        if (this.state.error?.message) {
          const parsed = JSON.parse(this.state.error.message);
          if (parsed.operationType) {
            isFirestoreError = true;
            errorMessage = `Database Error: You don't have permission to perform this action (${parsed.operationType} on ${parsed.path}).`;
          }
        }
      } catch (e) {
        // Not a JSON error, use default message
        errorMessage = this.state.error?.message || errorMessage;
      }

      return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 text-slate-200">
          <div className="bg-[#1e293b] border border-red-500/30 p-8 rounded-2xl max-w-md w-full text-center">
            <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-6" />
            <h1 className="text-2xl font-display font-bold mb-4 text-red-400">Oops! Something went wrong.</h1>
            <p className="text-slate-400 mb-6">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-accent text-[#0f172a] px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
