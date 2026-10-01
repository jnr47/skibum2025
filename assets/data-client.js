/* Read-only browser loader. Refresh periodically; age is re-evaluated every minute. */
(function () {
  const F = window.SkiBumForecast;
  let snapshot = null;
  window.SkiBumData = {
    async load() {
      const response = await fetch('/forecast-data.json', { cache: 'no-cache', signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error('Forecast download failed');
      const value = await response.json();
      if (value.schema_version !== 2 || !Array.isArray(value.resorts)) throw new Error('Forecast format awaiting update');
      snapshot = value;
      return F.views(snapshot, window.SKIBUM_RESORTS);
    },
    current() { return F.views(snapshot, window.SKIBUM_RESORTS); }
  };
}());
