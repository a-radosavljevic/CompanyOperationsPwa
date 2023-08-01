import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  reload() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {      // You can render any custom fallback UI      
      return <div className="alert alert-danger text-center" role="alert">
        <p>Došlo je do neočekivane greške</p>
        <button className="btn btn-primary" onClick={() => this.reload()}>Osveži stranicu</button>
      </div>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;