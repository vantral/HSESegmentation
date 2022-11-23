.PHONY: all
.PRECIOUS: %.hfst %.hfstol %.an.hfst %.gen.hfst
chkchn = ../chkchn
all: ckt.lexd.an.hfstol ckt.lexd.gen.hfstol

ckt.lexd.hfst: noun.lexd verb.lexd nounlist.lexd verbstems.lexd
	/usr/bin/time -o $@.time bash -c "set -o pipefail; cat $^ | lexd -s | hfst-txt2fst | hfst-minimise -o $@" && cat $@.time >&2
ckt.twol.hfst: ckt.twol
	hfst-twolc $< -o $@
%.hfstol: %.hfst
	/usr/bin/time -o $@.time hfst-fst2fst -O $< -o $@ && cat $@.time >&2
wordfreq: $(chkchn)/corpora/corporatxt
	cat $</* | sed -e "s/\([а-я]\)[‘’']\([а-я\]\)/\1ʼ\2/g" -e 's/[]0-9[:space:]!"()*,./:;?@\\^_|~«»–—„•…№‘’-]\+/\n/g' -e "s/'/\n/g" | uconv -x Any-Lower | grep [а-я] | sort | uniq -c | sort -n > $@
wordlist: wordfreq
	awk '{print $$2}' <$< > $@
us.hfstol: ckt.lexd.an.hfstol
	cp $< $@
them.hfstol: $(chkchn)/ckt.mor.hfstol
	cp $< $@
wordlist.%: %.hfstol wordlist
	./proc-wordlist $< $*
eval: wordlist.us wordlist.them
	./eval-wordlist us

ckt.%.elim0.hfst: ckt.%.hfst
	/usr/bin/time -o $@.time cp $< $@ && cat $@.time
include $(foreach n,$(shell seq 1 21),ckt.lexd.an.elim$(n).hfst.d)
ckt.lexd.an.elim%.hfst.d:
	@echo "ckt.lexd.an.elim$*.hfst: ckt.lexd.an.elim$$(( $* - 1 )).hfst; /usr/bin/time -o \$$@.time bash -c \"./hfst-flags \$$< | awk '\\\$$\$$1 < 10 { print \\\$$\$$2 }' | ./hfst-eliminate-min \$$< | hfst-minimise > \$$@\" && cat \$$@.time >&2"  > $@
include $(foreach n,$(shell seq 1 21),ckt.lexd.elim$(n).hfst.d)
ckt.lexd.elim%.hfst.d: 
	@echo "ckt.lexd.elim$*.hfst: ckt.lexd.elim$$(( $* - 1 )).hfst; /usr/bin/time -o \$$@.time bash -c \"./hfst-flags \$$< | awk '\\\$$\$$1 < 10 { print \\\$$\$$2 }' | ./hfst-eliminate-min \$$< | hfst-minimise > \$$@\" && cat \$$@.time >&2 " > $@

%.gen.hfst: %.hfst ckt.twol.hfst
	/usr/bin/time -o $@.time bash -c "set -o pipefail; hfst-compose-intersect $^ -o $@.big && hfst-minimise $@.big -o $@" && cat $@.time
%.an.hfst: %.gen.hfst
	/usr/bin/time -o $@.time bash -c "set -o pipefail; hfst-invert $< | hfst-minimise - -o $@" && cat $@.time

elim-an-study: $(foreach n,$(shell seq 0 21),wordlist.ckt.lexd.an.elim$(n)) wordlist.us wordlist.them
	./eval-wordlist us $(foreach n,$(shell seq 0 21),ckt.lexd.an.elim$(n))
elim-lexd-study: $(foreach n,$(shell seq 0 21),wordlist.ckt.lexd.elim$(n).an) wordlist.us wordlist.them
	./eval-wordlist us $(foreach n,$(shell seq 0 21),ckt.lexd.elim$(n).an)
