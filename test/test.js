describe('add function unit test.', function(){
    it('2 + 3 = 5', function(){
        var result  = add( 2, 3 );
        expect( result ).toBe( 5 );
    });
  
    it('2 + 3 = 6, this should faild.', function(){
        var result = add( 2, 3 );
        expect(result).toBe( 6 );
    })
});