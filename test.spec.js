describe('it do stuff', () => {
  it('fails', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(false).toBeTruthy();
  });

  it('passes', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(true).toBeTruthy();
  })
})